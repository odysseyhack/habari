import * as Client from 'fabric-client';
import {
  ChaincodeInfo,
  ChaincodeInstallRequest,
  ChaincodeInstantiateUpgradeRequest,
  ChaincodeInvokeRequest,
  Channel,
  ProposalResponse,
  ProposalResponseObject,
} from 'fabric-client';
import { Helper } from '../../helper';
import { BasicChaincodeInfo } from '../../entities/basicChainCodeInfo.interface';

export class ChaincodeWrapper {
  private helper: Helper = new Helper();
  private readonly MS_SLEEP_AFTER_INSTANTIATE: number = 10000;

  public constructor(private client: Client,
                     private channel: Channel,
                     private basicChaincodeInfo: BasicChaincodeInfo) {
    this.helper.debug('created the Chaincode wrapper');
  }

  /**
   * If the chaincode is not instantiated yet, install it and instantiate.
   * If the version is different than the one passed to the constructor of this function, upgrade.
   */
  public async initialize(): Promise<any> {
    const instantiatedChaincode = await this.getInstantiatedChaincode();
    try {
      this.helper.debug('Going to install chaincode...');
      await this.install();

      if (this.isTheInstantiatedVersionUpToDate(instantiatedChaincode)) {
        return;
      }

      if (typeof instantiatedChaincode !== 'undefined') {
        await this.upgrade();
      } else {
        await this.instantiate();
      }
    } catch (error) {
      this.helper.debug(error.message);
    }
  }

  public async install(): Promise<void> {
    const request: ChaincodeInstallRequest = this.getChaincodeInstallRequest();

    const response = await this.client.installChaincode(request);
    this.getPayloadFromResponseAndLogAnyErrors('Install chaincode', response);
  }

  public async invoke(functionName: string, args: string[]): Promise<string> {
    const logPrefix = `Invoke: ${functionName} ${args}`;

    const request: ChaincodeInvokeRequest = this.getChaincodeInvokeRequest(functionName, args);

    const response: ProposalResponseObject = await this.channel.sendTransactionProposal(request);

    let invokeResult: any = this.getPayloadFromResponseAndLogAnyErrors(logPrefix, response);

    try {
      const broadcastResponse = await this.sendTransactionToChannel(response, request);
      this.helper.debug(`${logPrefix}. Broadcast ${broadcastResponse.status}`);

      return invokeResult;
    } catch (err) {
      this.helper.error(`Error Occurred. Reason: ${err.message}`);

      return 'ERROR';
    }
  }

  public async query(functionName: string, args: string[]): Promise<string> {
    const request: ChaincodeInvokeRequest = this.getChaincodeInvokeRequest(functionName, args);
    const response: ProposalResponseObject = await this.channel.sendTransactionProposal(request);

    return this.getPayloadFromResponseAndLogAnyErrors(`Query: ${functionName} ${args}`, response);
  }

  private async instantiate(): Promise<void> {
    return this.instantiateOrUpgradeChaincode('instantiate');
  }

  private async upgrade(): Promise<void> {
    return this.instantiateOrUpgradeChaincode('upgrade');
  }

  private async instantiateOrUpgradeChaincode(instantiateOrUpgrade: 'instantiate' | 'upgrade'): Promise<void> {
    this.helper.debug(`Going to ${instantiateOrUpgrade} chaincode (this may take a minute)...`);

    const proposal: ChaincodeInstantiateUpgradeRequest = {
      txId: this.client.newTransactionID(true),
      ...this.basicChaincodeInfo, // Take the fields from basicChaincodeInfo and add them to the request.
    };

    let response: ProposalResponseObject = await this.sendInstantiateOrUpgradeProposal(instantiateOrUpgrade, proposal);

    this.getPayloadFromResponseAndLogAnyErrors(`Chaincode ${instantiateOrUpgrade}`, response);

    const broadcastResponse = await this.sendTransactionToChannel(response, proposal);

    this.helper.debug(`Chaincode ${instantiateOrUpgrade} broadcast ${broadcastResponse.status}`);

    await this.helper.sleep(this.MS_SLEEP_AFTER_INSTANTIATE);
  }

  /**
   * Function to parse the payload (return value) out of the proposal response. This is a naive approach that doesn't
   * handle errors and doesn't care if the responses are all the same.
   */
  private getPayloadFromResponseAndLogAnyErrors(logPrefix: string,
                                                proposalResponseObject: ProposalResponseObject): string {
    let payload: string = '';

    proposalResponseObject[0].forEach((response: ProposalResponse | Error, index: number) => {
      (response as Error).message;

      if (!(response as Error).message) {
        this.helper.debug(`[${index}] ${logPrefix}. ${(response as ProposalResponse).response.status}`);
        payload = (response as ProposalResponse).response.payload.toString('utf8');
      }
    });

    return payload;
  }

  /**
   * Does a 'queryInstantiatedChaincodes' request for the first peer of our organization and filters out the one we have
   * in our basicChaincodeInfo object.
   */
  public async getInstantiatedChaincode(): Promise<ChaincodeInfo | undefined> {
    this.helper.debug('Getting instantiated chaincode');
    const instantiatedChaincodesResponse = await this.channel.queryInstantiatedChaincodes(
      this.client.getPeersForOrg('')[1], true);

    return instantiatedChaincodesResponse.chaincodes
      .find((cc: ChaincodeInfo) => cc.name === this.basicChaincodeInfo.chaincodeId);
  }

  private isTheInstantiatedVersionUpToDate(instantiatedChaincode: ChaincodeInfo | undefined): boolean {
    return !!instantiatedChaincode && instantiatedChaincode.version === this.basicChaincodeInfo.chaincodeVersion;
  }

  private getChaincodeInstallRequest(): ChaincodeInstallRequest {
    return {
      txId:    this.client.newTransactionID(true),
      targets: this.client.getPeersForOrg(this.client.getMspid()),
      ...this.basicChaincodeInfo, // Take the fields from basicChaincodeInfo and add them to the request.
    };
  }

  private getChaincodeInvokeRequest(functionName: string, args: string[]): ChaincodeInvokeRequest {
    return {
      txId:        this.client.newTransactionID(),
      chaincodeId: this.basicChaincodeInfo.chaincodeId,
      fcn:         functionName,
      args:        args,
    };
  }

  private async sendTransactionToChannel(response: ProposalResponseObject,
                                         proposal: ChaincodeInstantiateUpgradeRequest | ChaincodeInvokeRequest): Promise<any> {
    return this.channel.sendTransaction({
      proposalResponses: response[0],
      proposal:          response[1],
      txId:              proposal.txId,
    });
  }

  private async sendInstantiateOrUpgradeProposal(instantiateOrUpgrade: string,
                                                 proposal: ChaincodeInstantiateUpgradeRequest): Promise<ProposalResponseObject> {
    if (instantiateOrUpgrade === 'instantiate') {
      return this.channel.sendInstantiateProposal(proposal);
    } else {
      return this.channel.sendUpgradeProposal(proposal);
    }
  }
}

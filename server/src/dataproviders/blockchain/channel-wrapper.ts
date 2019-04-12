import * as fs from 'fs';
import * as path from 'path';
import * as Client from 'fabric-client';
import {Channel, ChannelRequest, JoinChannelRequest, Peer} from 'fabric-client';
import {Helper} from '../../helper';
import {ResponseStatusType} from '../../../shared/enums/ResponseStatusType.enum';
import {ErrorMessageType} from '../../../shared/enums/ErrorMessageType.enum';

export class ChannelWrapper {
  private helper: Helper = new Helper();
  private readonly channelName: string = 'mychannel';
  private readonly channelConfigPath: string = '../../../config/channel.tx';

  public constructor(private client: Client) {
  }

  public async createAndJoinChannel(): Promise<any> {
    await this.create();
    await this.join();
  }

  public get channel(): Channel {
    return this.client.getChannel(this.channelName);
  }

  public async create(): Promise<void> {
    const envelope_bytes = fs.readFileSync(path.join(__dirname, this.channelConfigPath));
    const config = this.client.extractChannelConfig(envelope_bytes);
    const signatures = [this.client.signChannelConfig(config)];
    this.helper.debug('Signed channel configuration');

    this.helper.debug('Sending create channel request to orderer');
    const response = await this.client.createChannel(await this.buildCreateChannelRequest(config, signatures));

    this.helper.debug(`Create channel ${response.status}`);
    if (response.status === ResponseStatusType.BAD_REQUEST) {
      if (response.info && response.info.indexOf('readset expected key [Group]  /Channel/Application at version 0') > -1) {
        this.helper.debug('Channel already exists.');
      } else {
        throw new Error(response.info);
      }
    } else if (response.status === ResponseStatusType.SUCCESS) {
      await this.helper.sleep(5000);
    }
  }

  public async join(): Promise<void> {
    try {
      const targetPeers: Peer[] = await this.getTargetsForJoinChannelRequest();

      this.helper.debug(`Joining channel with ${targetPeers.length} peers of ${this.client.getMspid()}`);

      await this.channel.joinChannel(await this.buildJoinChannelRequest(targetPeers));
    } catch (error) {
      if (error.message === ErrorMessageType.LEDGER_ID_EXISTS) {
        this.helper.debug(`Peer has already joined this channel.`);
      }

      if (error.message === ErrorMessageType.IDENTITY_NOT_ADMIN) {
        throw new Error(`Got 'this identity is not an admin'. Did you create a txId with admin: true?`);
      }

      if (error.message === ErrorMessageType.CREATOR_DESERIALIZE_FAILURE) {
        throw new Error(`Join channel error (are you referring to the right peer?) - ${error.message}`);
      }
    }
  }

  private async getGenesisBlockForChannel(): Promise<any> {
    return await this.channel.getGenesisBlock({
      txId: this.client.newTransactionID()
    });
  }

  private async getTargetsForJoinChannelRequest(): Promise<Peer[]> {
    return await this.client.getPeersForOrg(this.client.getMspid());
  }

  private async buildJoinChannelRequest(targets: Peer[]): Promise<JoinChannelRequest> {
    return {
      targets: targets, // This can also be omitted, it defaults to all peers of our own organization.
      block: await this.getGenesisBlockForChannel(),
      txId: this.client.newTransactionID(true) // Admin action, so we need to pass 'true'
    };
  }

  private async buildCreateChannelRequest(config: any, signatures: any): Promise<ChannelRequest> {
    return {
      config: config,
      signatures: signatures,
      name: this.channelName,
      orderer: this.channel.getOrderers()[0],
      txId: this.client.newTransactionID()
    };
  }
}

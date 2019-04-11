import { Injectable } from '@nestjs/common';
import {Helper} from '../../helper';
import {ChannelWrapper} from './channel-wrapper';
import {ChaincodeWrapper} from './chaincode-wrapper';
import * as Client from 'fabric-client';
import * as path from 'path';
import {BasicChaincodeInfo} from '../../../chaincode/models/basicChainCodeInfo.interface';
import {ChaincodeFunctionType} from '../../../shared/enums/ChainCodeFunctionType.enum';

const CONFIG_PATH = 'network/connectionprofile.localhost.org1.yaml';

@Injectable()
export class BlockchainService {
  private helper: Helper = new Helper();

  public async start(): Promise<any> {
    const client = await this.initializeClient();
    const channelWrapper = new ChannelWrapper(client);
    await channelWrapper.createAndJoinChannel();

    const mychaincode: BasicChaincodeInfo = {
      chaincodeVersion: '1',
      chaincodeId: 'mychaincode',
      chaincodePath: path.join(__dirname, 'chaincode'),
      chaincodeType: 'node'
    };

    // Install and instantiate chaincode
    const chaincode = new ChaincodeWrapper(client, channelWrapper.channel, mychaincode);
    await chaincode.initialize();

    const result = await chaincode.query(ChaincodeFunctionType.GetMarblesByRange, ['', '']);
    console.log('Result:', result);
    // await this.helper.sleep(4000);

    return chaincode.getInstantiatedChaincode();
  }

  private async initializeClient(): Promise<Client> {
    const client = Client.loadFromConfig(CONFIG_PATH);
    await client.initCredentialStores();

    await client.setUserContext({username: 'admin', password: 'adminpw'});

    console.log('Client:');
    console.log(client);

    return client;
  }

  getChannels(): object {
    return this.start();
  }
}

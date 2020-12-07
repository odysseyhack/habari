import { Injectable } from '@nestjs/common';
import { Helper } from '../../helper';
import { ChannelWrapper } from './channel-wrapper';
import { ChaincodeWrapper } from './chaincode-wrapper';
import * as Client from 'fabric-client';
import * as path from 'path';
import { BasicChaincodeInfo } from '../../entities/basicChainCodeInfo.interface';
import { Field } from '../../entities/blockchainEntities/field';
import { Location } from '../../entities/privateDBEntities/location';
import { CropType } from '../../entities/enums/CropType';

const CONFIG_PATH = 'network/connectionprofile.localhost.org1.yaml';

@Injectable()
export class BlockchainService {
  private helper: Helper = new Helper();

  public async start(): Promise<any> {
    const client = await this.initializeClient();
    const channelWrapper = new ChannelWrapper(client);
    await channelWrapper.createAndJoinChannel();

    const mychaincode: BasicChaincodeInfo = this.getBasicChaincodeInfo();

    const chaincode = new ChaincodeWrapper(client, channelWrapper.channel, mychaincode);
    await chaincode.initialize();

    const location = new Location('karel', 'hans', 'peppie');
    const field = new Field('field1', CropType.CORN, location);

    const result = await chaincode.invoke('createField', [JSON.stringify(field)]);
    console.log('Result:', result);

    // return chaincode.getInstantiatedChaincode();
  }

  private async initializeClient(): Promise<Client> {
    const client = Client.loadFromConfig(CONFIG_PATH);
    await client.initCredentialStores();

    await client.setUserContext({ username: 'admin', password: 'adminpw' });

    return client;
  }

  private getBasicChaincodeInfo(): BasicChaincodeInfo {
    return {
      chaincodeVersion: '1',
      chaincodeId:      'mychaincode',
      chaincodePath:    path.join('chaincode'),
      chaincodeType:    'node',
    };
  }
}

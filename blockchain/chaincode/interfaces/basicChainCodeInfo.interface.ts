import {ChaincodeType} from 'fabric-client';

export interface BasicChaincodeInfo {
  chaincodeId: string;
  chaincodeVersion: string;
  chaincodePath: string;
  chaincodeType: ChaincodeType;
}
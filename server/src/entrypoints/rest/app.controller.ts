import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../../dataproviders/database/database.service';
import {BlockchainService} from '../../dataproviders/blockchain/blockchain.service';

@Controller()
export class AppController {
  constructor(private readonly databaseService: DatabaseService,
              private readonly blockchainService: BlockchainService) {}

  @Get()
  public getHello(): object {
    return this.databaseService.getHello();
  }

  @Get('/channels')
  public getChannels(): object {
    return this.blockchainService.getChannels();
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './entrypoints/rest/app.controller';
import { DatabaseService } from './dataproviders/database/database.service';
import { BlockchainService } from './dataproviders/blockchain/blockchain.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DatabaseService, BlockchainService],
})
export class AppModule {}

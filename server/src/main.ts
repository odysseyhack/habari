import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BlockchainService } from './dataproviders/blockchain/blockchain.service';
import { DatabaseService } from './dataproviders/database/database.service';

export class Main {
  public async bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();


    this.createPublicDBDatabases();
    new BlockchainService().start();

    await app.listen(3000);
  }

  private async createPublicDBDatabases(): Promise<void> {
    const databaseService = new DatabaseService();
    await databaseService.createDB('_users');
    await databaseService.createDB('_replicator');
    await databaseService.createDB('_global_changes');
    await databaseService.createDB('location');
    await databaseService.createDB('donors');
    await databaseService.createDB('farmers');
  }
}

new Main().bootstrap();

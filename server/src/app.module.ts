import { Module } from '@nestjs/common';
import { AppController } from './entrypoints/rest/app.controller';
import { DatabaseService } from './dataproviders/database/database.service';
import { BlockchainService } from './dataproviders/blockchain/blockchain.service';
import { FieldsController } from './entrypoints/rest/fields/fields.controller';
import { MaterialsController } from './entrypoints/rest/materials/materials.controller';
import { ProposalsController } from './entrypoints/rest/proposals/proposals.controller';
import { ReportsController } from './entrypoints/rest/reports/reports.controller';
import { ShipmentsController } from './entrypoints/rest/shipments/shipments.controller';
import { SolutionsController } from './entrypoints/rest/solutions/solutions.controller';
import { SimulateController } from './entrypoints/rest/simulate/simulate.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    FieldsController,
    MaterialsController,
    ProposalsController,
    ReportsController,
    ShipmentsController,
    SolutionsController,
    SimulateController
  ],
  providers: [
    DatabaseService,
    BlockchainService
  ],
})
export class AppModule {}

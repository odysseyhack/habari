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
import { DonorsController } from './entrypoints/rest/donors/donors.controller';
import { DonorUsecases } from './usecases/donor.usecases';
import { FarmerUsecases } from './usecases/farmer.usecases';
import { FarmersController } from './entrypoints/rest/farmers/farmers.controller';
import { BlueprintService } from './entities/services/blueprint/blueprint.service';
import { FieldService } from './entities/services/field/field.service';
import { MaterialService } from './entities/services/material/material.service';
import { ProposalService } from './entities/services/proposal/proposal.service';
import { ReportService } from './entities/services/report/report.service';
import { ShipmentService } from './entities/services/shipment/shipment.service';
import { SolutionService } from './entities/services/solution/solution.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    FieldsController,
    MaterialsController,
    DonorsController,
    FarmersController,
    ProposalsController,
    ReportsController,
    ShipmentsController,
    SolutionsController,
    SimulateController
  ],
  providers: [
    DonorUsecases,
    FarmerUsecases,
    DatabaseService,
    BlockchainService,
    BlueprintService,
    FieldService,
    MaterialService,
    ProposalService,
    ReportService,
    ShipmentService,
    SolutionService
  ],
})
export class AppModule {}

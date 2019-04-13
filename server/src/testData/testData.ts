import { FarmerUsecases } from '../usecases/farmer.usecases';
import { DatabaseService } from '../dataproviders/database/database.service';
import { FarmerInterface } from '../entities/interfaces/farmer.interface';

export class TestData {
  public async create(): Promise<void> {
    await new FarmerUsecases(new DatabaseService()).createFarmer(this.getTestFarmer());
  }

  private getTestFarmer(): FarmerInterface {
    return {
      username:  'irma@deboer.nl',
      password:  'password',
      firstName: 'Irma',
      lastName:  'de Boer',
      address:   'frieschestraat 12',
    };
  }
}

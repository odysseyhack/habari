import { DatabaseService } from '../dataproviders/database/database.service';
import { Body, Injectable } from '@nestjs/common';
import { Farmer } from '../entities/privateDBEntities/farmer';
import { FarmerInterface } from '../entities/interfaces/farmer.interface';

@Injectable()
export class FarmerUsecases {

  public constructor(private databaseService: DatabaseService) {
  }

  public async createFarmer(unsubscribedFarmer: FarmerInterface): Promise<any> {
    this.databaseService.use('farmers');

    const donor = new Farmer(unsubscribedFarmer.username,
      unsubscribedFarmer.password,
      unsubscribedFarmer.firstName,
      unsubscribedFarmer.lastName,
      unsubscribedFarmer.address);
    return this.databaseService.insert(unsubscribedFarmer.username, donor);
  }
}

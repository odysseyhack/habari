import { DatabaseService } from '../dataproviders/database/database.service';
import { Body, Injectable } from '@nestjs/common';
import { DonorInterface } from '../entities/interfaces/donor.interface';
import { Donor } from '../entities/privateDBEntities/donor';

@Injectable()
export class DonorUsecases {

  public constructor(private databaseService: DatabaseService) {
  }

  public async createDonor(unsubscribedDonor: DonorInterface): Promise<any> {
    this.databaseService.use('donors');

    const donor = new Donor(unsubscribedDonor.username,
      unsubscribedDonor.password,
      unsubscribedDonor.firstName,
      unsubscribedDonor.lastName,
      unsubscribedDonor.address);
    return this.databaseService.insert(unsubscribedDonor.username, donor);
  }
}

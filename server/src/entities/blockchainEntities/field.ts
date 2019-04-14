import { CropType } from '../enums/CropType';
import { Location } from '../privateDBEntities/location';

export class Field {
  public constructor(public readonly id: string,
                     public cropType: CropType,
                     public location?: Location) { }
}

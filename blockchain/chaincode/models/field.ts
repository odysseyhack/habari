import { CropType } from '../enums/CropType';

export class Field {
  public constructor(public readonly id: string,
                     public location: Location,
                     public cropType: CropType) { }
}

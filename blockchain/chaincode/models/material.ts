import { MaterialType } from '../enums/MaterialType';

export class Material {
  public constructor(public readonly id: string,
                     public materialType: MaterialType,
                     public quantity: string) { }

}

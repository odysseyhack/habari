import { Material } from './material';

export class Shipment {
  public constructor(public readonly id: string,
                     public fromLocation: string,
                     public toLocation: string,
                     public cargo: Material[]) { }

}

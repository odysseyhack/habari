import { Material } from './material';

export class Blueprint {
  public constructor(public readonly id: string,
                     public bluePrintType: string,
                     public description: string,
                     public recipe: Material[]) { }

}

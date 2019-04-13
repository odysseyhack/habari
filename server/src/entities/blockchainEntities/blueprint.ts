import { Material } from './material';

export class Blueprint {
  public readonly id: string;
  public bluePrintType: string;
  public description: string;
  public recipe: Material[];
}

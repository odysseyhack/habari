import { Material } from './Material';

export interface Shipment {
  id: string;
  fromLocation: string;
  toLocation: string;
  cargo: Material[];
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class ShipmentService {
  public create(): object {
    return { 'data': 'TODO: implement shipments POST endpoint' };
  }

  public findAll(): object {
    return { 'data': 'TODO: implement shipments GET endpoint' };
  }

  public findById(id: string): object {
    return { 'data': 'TODO: implement shipments GET:id endpoint', 'id': id };
  }

  public update(id: string): object {
    return { 'data': 'TODO: implement shipments PUT:id endpoint', 'id': id};
  }

  public remove(id: string): object {
    return { 'data': 'TODO: implement shipments DELETE:id endpoint', 'id': id};
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class MaterialService {
  public create(): object {
    return { 'data': 'TODO: implement materials POST endpoint' };
  }

  public findAll(): object {
    return { 'data': 'TODO: implement materials GET endpoint' };
  }

  public findById(id: string): object {
    return { 'data': 'TODO: implement materials GET:id endpoint', 'id': id };
  }

  public update(id: string): object {
    return { 'data': 'TODO: implement materials PUT:id endpoint', 'id': id};
  }

  public remove(id: string): object {
    return { 'data': 'TODO: implement materials DELETE:id endpoint', 'id': id};
  }
}

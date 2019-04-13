import { Injectable } from '@nestjs/common';

@Injectable()
export class FieldService {
  public create(): object {
    return { 'data': 'TODO: implement fields POST endpoint' };
  }

  public findAll(): object {
    return { 'data': 'TODO: implement fields GET endpoint' };
  }

  public findById(id: string): object {
    return { 'data': 'TODO: implement fields GET:id endpoint', 'id': id };
  }

  public update(id: string): object {
    return { 'data': 'TODO: implement fields PUT:id endpoint', 'id': id};
  }

  public remove(id: string): object {
    return { 'data': 'TODO: implement fields DELETE:id endpoint', 'id': id};
  }
}

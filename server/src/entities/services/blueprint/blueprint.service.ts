import { Injectable } from '@nestjs/common';

@Injectable()
export class BlueprintService {
  public create(): object {
    return { 'data': 'TODO: implement blueprint POST endpoint' };
  }

  public findAll(): object {
    return { 'data': 'TODO: implement blueprint GET endpoint' };
  }

  public findById(id: string): object {
    return { 'data': 'TODO: implement blueprint GET:id endpoint', 'id': id };
  }

  public update(id: string): object {
    return { 'data': 'TODO: implement blueprint PUT:id endpoint', 'id': id};
  }

  public remove(id: string): object {
    return { 'data': 'TODO: implement blueprint DELETE:id endpoint', 'id': id};
  }
}

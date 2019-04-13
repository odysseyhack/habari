import { Injectable } from '@nestjs/common';

@Injectable()
export class SolutionService {
  public create(): object {
    return { 'data': 'TODO: implement solutions POST endpoint' };
  }

  public findAll(): object {
    return { 'data': 'TODO: implement solutions GET endpoint' };
  }

  public findById(id: string): object {
    return { 'data': 'TODO: implement solutions GET:id endpoint', 'id': id };
  }

  public update(id: string): object {
    return { 'data': 'TODO: implement solutions PUT:id endpoint', 'id': id};
  }

  public remove(id: string): object {
    return { 'data': 'TODO: implement solutions DELETE:id endpoint', 'id': id};
  }
}

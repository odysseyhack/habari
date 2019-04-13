import { Injectable } from '@nestjs/common';

@Injectable()
export class ProposalService {
  public create(): object {
    return { 'data': 'TODO: implement proposals POST endpoint' };
  }

  public findAll(): object {
    return { 'data': 'TODO: implement proposals GET endpoint' };
  }

  public findById(id: string): object {
    return { 'data': 'TODO: implement proposals GET:id endpoint', 'id': id };
  }

  public update(id: string): object {
    return { 'data': 'TODO: implement proposals PUT:id endpoint', 'id': id};
  }

  public remove(id: string): object {
    return { 'data': 'TODO: implement proposals DELETE:id endpoint', 'id': id};
  }
}

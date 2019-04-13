import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  public create(): object {
    return { 'data': 'TODO: implement reports POST endpoint' };
  }

  public findAll(): object {
    return { 'data': 'TODO: implement reports GET endpoint' };
  }

  public findById(id: string): object {
    return { 'data': 'TODO: implement reports GET:id endpoint', 'id': id };
  }

  public update(id: string): object {
    return { 'data': 'TODO: implement reports PUT:id endpoint', 'id': id};
  }

  public remove(id: string): object {
    return { 'data': 'TODO: implement reports DELETE:id endpoint', 'id': id};
  }
}

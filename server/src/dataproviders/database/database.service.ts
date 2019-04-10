import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  getHello(): object {
    return { 'msg': 'Hello from the MIMEA server!' };
  }
}

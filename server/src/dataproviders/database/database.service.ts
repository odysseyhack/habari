import { Injectable } from '@nestjs/common';
import * as Nano from 'nano';

@Injectable()
export class DatabaseService {
  private nano = Nano('http://privatedb:5984');
  private database: Nano.DocumentScope<{}>;

  public async createDB(databaseName: string): Promise<void> {
    try {
      await this.nano.db.create(databaseName);
    } catch (error) {
      console.log('error in db, probably the db already exists');
    }
  }

  public async use(databaseName: string): Promise<void> {
    this.database = this.nano.use(databaseName);
  }

  public async get(documentName: string): Promise<any> {
    return await this.database.get(documentName);
  }

  public async insert(documentName: string, data: any): Promise<any> {
    return await this.database.insert(data, documentName);
  }

  public async update(documentName: string, data: any): Promise<any> {
    let bla = await this.database.get(documentName);
    data._id = bla._id;
    data._rev = bla._rev;

    return await this.database.insert(data);
  }

  public async delete(documentName: string): Promise<any> {
    let bla = await this.database.get(documentName);

    await this.database.destroy(documentName, bla._rev);
  }
}

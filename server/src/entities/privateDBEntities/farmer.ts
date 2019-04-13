import shortid = require('shortid');

export class Farmer {
  public farmerIdentificationCode: string;

  public constructor(public username: string,
                     public password: string,
                     public firstName: string,
                     public lastName: string,
                     public address: string) {
    this.farmerIdentificationCode = shortid();
  }
}

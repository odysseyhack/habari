import shortid = require('shortid');

export class Donor {
  public donatorIdentificationCode: string;

  public constructor(public username: string,
                     public password: string,
                     public firstName: string,
                     public lastName: string,
                     public address: string) {
    this.donatorIdentificationCode = shortid();
  }
}

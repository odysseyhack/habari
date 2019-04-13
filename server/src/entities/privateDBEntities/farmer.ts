import shortid = require('shortid');

export class Farmer {
  private _farmerIdentificationCode: string;

  public constructor(private username: string,
                     private firstName: string,
                     private lastName: string,
                     private address: string) {
    this._farmerIdentificationCode = shortid();
  }

  get farmerIdentificationCode(): string {
    return this._farmerIdentificationCode;
  }
}

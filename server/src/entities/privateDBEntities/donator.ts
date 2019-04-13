import shortid = require('shortid');

export class Donator {
  private _donatorIdentificationCode: string;

  public constructor(private username: string,
                     private firstName: string,
                     private lastName: string,
                     private address: string) {
    this._donatorIdentificationCode = shortid();
  }

  get donatorIdentificationCode(): string {
    return this._donatorIdentificationCode;
  }
}

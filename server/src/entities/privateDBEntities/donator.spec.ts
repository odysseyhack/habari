import { Donator } from './donator';

describe('Farmer', () => {
  const donator = new Donator('test',
    'firstName',
    'lastname',
    'address');

  it('should be defined', () => {
    expect(donator).toBeDefined();
  });

  it('should have a farmerID', () => {
    expect(donator.donatorIdentificationCode).toBeDefined();
  });
});

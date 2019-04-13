import { Farmer } from './farmer';

describe('Farmer', () => {
  const farmer = new Farmer('test',
    'firstName',
    'lastname',
    'address');

  it('should be defined', () => {
    expect(farmer).toBeDefined();
  });

  it('should have a farmerID', () => {
    expect(farmer.farmerIdentificationCode).toBeDefined();
  });
});

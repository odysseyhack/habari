import { Farmer } from './farmer';

describe('Farmer', () => {
  const farmer = new Farmer('test',
    'password',
    'firstName',
    'lastname',
    'address');

  it('should be defined', () => {
    expect(farmer).toBeDefined();
  });

  it('should have the correct properties once created', () => {
    expect(farmer.username).toBe('test');
    expect(farmer.password).toBe('password');
    expect(farmer.firstName).toBe('firstName');
    expect(farmer.lastName).toBe('lastname');
    expect(farmer.address).toBe('address');
    expect(farmer.farmerIdentificationCode).toBeDefined();
  });
});

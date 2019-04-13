import { Donor } from './donor';

describe('Donors', () => {
  const donors = new Donor('test',
    'password',
    'firstName',
    'lastname',
    'address');

  it('should be defined', () => {
    expect(donors).toBeDefined();
  });

  it('should have the correct properties once created', () => {
    expect(donors.username).toBe('test');
    expect(donors.password).toBe('password');
    expect(donors.firstName).toBe('firstName');
    expect(donors.lastName).toBe('lastname');
    expect(donors.address).toBe('address');
    expect(donors.donatorIdentificationCode).toBeDefined();
  });
});

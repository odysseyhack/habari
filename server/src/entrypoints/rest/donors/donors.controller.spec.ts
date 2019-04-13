import { Test, TestingModule } from '@nestjs/testing';
import { DonorsController } from './donors.controller';
import { DonorUsecases } from '../../../usecases/donor.usecases';

describe('Donators Controller', () => {
  let controller: DonorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonorsController],
      providers:   [{ provide: DonorUsecases, useValue: {createDonor: (donor) => donor} }],
    }).compile();

    controller = module.get<DonorsController>(DonorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return all blueprint', async () => {
      const donor = { username: 'username', password: 'pass', firstName: 'firstName', lastName: 'lastName', address: 'teststreet' };
      expect(await controller.create(donor)).toBe(donor);
    });
  });

  describe('findAll', () => {
    it('should return all blueprint', async () => {
      const result = { 'data': 'TODO: implement blueprint GET endpoint' };
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all blueprint', async () => {
      const result = { 'data': 'TODO: implement blueprint GET:id endpoint', 'id': '42' };
      expect(await controller.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all blueprint', async () => {
      const result = { 'data': 'TODO: implement blueprint PUT:id endpoint', 'id': '42' };
      expect(await controller.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all blueprint', async () => {
      const result = { 'data': 'TODO: implement blueprint DELETE:id endpoint', 'id': '42' };
      expect(await controller.remove('42')).toEqual(result);
    });
  });
});

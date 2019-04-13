import { Test, TestingModule } from '@nestjs/testing';
import { FarmersController } from './farmers.controller';
import { FarmerUsecases } from '../../../usecases/farmer.usecases';

describe('Farmers Controller', () => {
  let controller: FarmersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmersController],
      providers:   [{ provide: FarmerUsecases, useValue: {createFarmer: (farmer) => farmer} }],
    }).compile();

    controller = module.get<FarmersController>(FarmersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return all farmers', async () => {
      const farmer = {
        username: 'username',
        password: 'testpass',
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'teststreet'
      };

      expect(await controller.create(farmer)).toBe(farmer);
    });
  });

  describe('findAll', () => {
    it('should return all farmers', async () => {
      const result = {
        'data': 'TODO: implement farmers GET endpoint'
      };

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all farmers', async () => {
      const result = {
        'data': 'TODO: implement farmers GET:id endpoint',
        'id': '42'};

      expect(await controller.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all farmers', async () => {
      const result = {
        'data': 'TODO: implement farmers PUT:id endpoint',
        'id': '42'
      };

      expect(await controller.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all farmers', async () => {
      const result = {
        'data': 'TODO: implement farmers DELETE:id endpoint',
        'id': '42'
      };

      expect(await controller.remove('42')).toEqual(result);
    });
  });
});

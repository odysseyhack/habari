import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentsController } from './shipments.controller';

describe('Shipments Controller', () => {
  let controller: ShipmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipmentsController],
    }).compile();

    controller = module.get<ShipmentsController>(ShipmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return all shipments', async () => {
      const result = { 'data': 'TODO: implement shipments POST endpoint' };
      expect(await controller.create()).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all shipments', async () => {
      const result = { 'data': 'TODO: implement shipments GET endpoint' };
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all shipments', async () => {
      const result = { 'data': 'TODO: implement shipments GET:id endpoint', 'id': '42' };
      expect(await controller.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all shipments', async () => {
      const result = { 'data': 'TODO: implement shipments PUT:id endpoint', 'id': '42' };
      expect(await controller.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all shipments', async () => {
      const result = { 'data': 'TODO: implement shipments DELETE:id endpoint', 'id': '42' };
      expect(await controller.remove('42')).toEqual(result);
    });
  });
});

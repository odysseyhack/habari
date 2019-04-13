import { Test, TestingModule } from '@nestjs/testing';
import { MaterialsController } from './materials.controller';

describe('Materials Controller', () => {
  let controller: MaterialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialsController],
    }).compile();

    controller = module.get<MaterialsController>(MaterialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return all materials', async () => {
      const result = { 'data': 'TODO: implement materials POST endpoint' };
      expect(await controller.create()).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all materials', async () => {
      const result = { 'data': 'TODO: implement materials GET endpoint' };
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all materials', async () => {
      const result = { 'data': 'TODO: implement materials GET:id endpoint', 'id': '42' };
      expect(await controller.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all materials', async () => {
      const result = { 'data': 'TODO: implement materials PUT:id endpoint', 'id': '42' };
      expect(await controller.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all materials', async () => {
      const result = { 'data': 'TODO: implement materials DELETE:id endpoint', 'id': '42' };
      expect(await controller.remove('42')).toEqual(result);
    });
  });
});

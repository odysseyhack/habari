import { Test, TestingModule } from '@nestjs/testing';
import { FieldsController } from './fields.controller';

describe('Fields Controller', () => {
  let controller: FieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldsController],
    }).compile();

    controller = module.get<FieldsController>(FieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return all fields', async () => {
      const result = { 'data': 'TODO: implement fields POST endpoint' };
      expect(await controller.create()).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all fields', async () => {
      const result = { 'data': 'TODO: implement fields GET endpoint' };
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all fields', async () => {
      const result = { 'data': 'TODO: implement fields GET:id endpoint', 'id': '42' };
      expect(await controller.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all fields', async () => {
      const result = { 'data': 'TODO: implement fields PUT:id endpoint', 'id': '42' };
      expect(await controller.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all fields', async () => {
      const result = { 'data': 'TODO: implement fields DELETE:id endpoint', 'id': '42' };
      expect(await controller.remove('42')).toEqual(result);
    });
  });
});

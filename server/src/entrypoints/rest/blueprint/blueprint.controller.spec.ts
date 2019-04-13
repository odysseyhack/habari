import { Test, TestingModule } from '@nestjs/testing';
import { BlueprintController } from './blueprint.controller';

describe('Blueprint Controller', () => {
  let controller: BlueprintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlueprintController],
    }).compile();

    controller = module.get<BlueprintController>(BlueprintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return all blueprint', async () => {
      const result = { 'data': 'TODO: implement blueprint POST endpoint' };
      expect(await controller.create()).toEqual(result);
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

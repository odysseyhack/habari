import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';

describe('Reports Controller', () => {
  let controller: ReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return all reports', async () => {
      const result = { 'data': 'TODO: implement reports POST endpoint' };
      expect(await controller.create()).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all reports', async () => {
      const result = { 'data': 'TODO: implement reports GET endpoint' };
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all reports', async () => {
      const result = { 'data': 'TODO: implement reports GET:id endpoint', 'id': '42' };
      expect(await controller.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all reports', async () => {
      const result = { 'data': 'TODO: implement reports PUT:id endpoint', 'id': '42' };
      expect(await controller.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all reports', async () => {
      const result = { 'data': 'TODO: implement reports DELETE:id endpoint', 'id': '42' };
      expect(await controller.remove('42')).toEqual(result);
    });
  });
});

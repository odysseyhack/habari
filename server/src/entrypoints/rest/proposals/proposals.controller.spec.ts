import { Test, TestingModule } from '@nestjs/testing';
import { ProposalsController } from './proposals.controller';

describe('Proposals Controller', () => {
  let controller: ProposalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProposalsController],
    }).compile();

    controller = module.get<ProposalsController>(ProposalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return all proposals', async () => {
      const result = { 'data': 'TODO: implement proposals POST endpoint' };
      expect(await controller.create()).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all proposals', async () => {
      const result = { 'data': 'TODO: implement proposals GET endpoint' };
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all proposals', async () => {
      const result = { 'data': 'TODO: implement proposals GET:id endpoint', 'id': '42' };
      expect(await controller.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all proposals', async () => {
      const result = { 'data': 'TODO: implement proposals PUT:id endpoint', 'id': '42' };
      expect(await controller.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all proposals', async () => {
      const result = { 'data': 'TODO: implement proposals DELETE:id endpoint', 'id': '42' };
      expect(await controller.remove('42')).toEqual(result);
    });
  });
});

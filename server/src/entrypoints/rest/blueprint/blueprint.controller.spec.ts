import { BlueprintController } from './blueprint.controller';
import { BlueprintService } from '../../../entities/services/blueprint/blueprint.service';

describe('Blueprint Controller', () => {
  let blueprintController: BlueprintController;

  beforeEach(async () => {
    const blueprintService = new BlueprintService();
    blueprintController = new BlueprintController(blueprintService);
  });

  it('should be defined', () => {
    expect(blueprintController).toBeDefined();
  });

  describe('create', () => {
    it('should return all blueprint', async () => {
      const result = { 'data': 'TODO: implement blueprint POST endpoint' };
      expect(await blueprintController.create()).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all blueprint', async () => {
      const result = { 'data': 'TODO: implement blueprint GET endpoint' };
      expect(await blueprintController.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all blueprint', async () => {
      const result = { 'data': 'TODO: implement blueprint GET:id endpoint', 'id': '42' };
      expect(await blueprintController.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all blueprint', async () => {
      const result = { 'data': 'TODO: implement blueprint PUT:id endpoint', 'id': '42' };
      expect(await blueprintController.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all blueprint', async () => {
      const result = { 'data': 'TODO: implement blueprint DELETE:id endpoint', 'id': '42' };
      expect(await blueprintController.remove('42')).toEqual(result);
    });
  });
});

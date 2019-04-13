import { MaterialsController } from './materials.controller';
import { MaterialService } from '../../../entities/services/material/material.service';

describe('Materials Controller', () => {
  let materialsController: MaterialsController;

  beforeEach(async () => {
    const materialsService = new MaterialService();
    materialsController = new MaterialsController(materialsService)
  });

  it('should be defined', () => {
    expect(materialsController).toBeDefined();
  });

  describe('create', () => {
    it('should return all materials', async () => {
      const result = { 'data': 'TODO: implement materials POST endpoint' };
      expect(await materialsController.create()).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all materials', async () => {
      const result = { 'data': 'TODO: implement materials GET endpoint' };
      expect(await materialsController.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all materials', async () => {
      const result = { 'data': 'TODO: implement materials GET:id endpoint', 'id': '42' };
      expect(await materialsController.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all materials', async () => {
      const result = { 'data': 'TODO: implement materials PUT:id endpoint', 'id': '42' };
      expect(await materialsController.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all materials', async () => {
      const result = { 'data': 'TODO: implement materials DELETE:id endpoint', 'id': '42' };
      expect(await materialsController.remove('42')).toEqual(result);
    });
  });
});

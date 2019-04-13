import { FieldsController } from './fields.controller';
import { FieldService } from '../../../entities/services/field/field.service';

describe('Fields Controller', () => {
  let fieldsController: FieldsController;

  beforeEach(async () => {
    const fieldService = new FieldService();
    fieldsController = new FieldsController(fieldService);
  });

  it('should be defined', () => {
    expect(fieldsController).toBeDefined();
  });

  describe('create', () => {
    it('should return all fields', async () => {
      const result = { 'data': 'TODO: implement fields POST endpoint' };
      expect(await fieldsController.create()).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all fields', async () => {
      const result = { 'data': 'TODO: implement fields GET endpoint' };
      expect(await fieldsController.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all fields', async () => {
      const result = { 'data': 'TODO: implement fields GET:id endpoint', 'id': '42' };
      expect(await fieldsController.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all fields', async () => {
      const result = { 'data': 'TODO: implement fields PUT:id endpoint', 'id': '42' };
      expect(await fieldsController.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all fields', async () => {
      const result = { 'data': 'TODO: implement fields DELETE:id endpoint', 'id': '42' };
      expect(await fieldsController.remove('42')).toEqual(result);
    });
  });
});

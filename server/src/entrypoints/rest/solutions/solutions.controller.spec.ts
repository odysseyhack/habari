import { SolutionsController } from './solutions.controller';
import { SolutionService } from '../../../entities/services/solution/solution.service';

describe('Solutions Controller', () => {
  let solutionsController: SolutionsController;

  beforeEach(async () => {
    const solutionService = new SolutionService();
    solutionsController = new SolutionsController(solutionService);
  });

  it('should be defined', () => {
    expect(solutionsController).toBeDefined();
  });

  describe('create', () => {
    it('should return all solutions', async () => {
      const result = {
        'data': 'TODO: implement solutions POST endpoint'
      };

      expect(await solutionsController.create()).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all solutions', async () => {
      const result = {
        'data': 'TODO: implement solutions GET endpoint'
      };

      expect(await solutionsController.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all solutions', async () => {
      const result = {
        'data': 'TODO: implement solutions GET:id endpoint',
        'id': '42'
      };

      expect(await solutionsController.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all solutions', async () => {
      const result = {
        'data': 'TODO: implement solutions PUT:id endpoint',
        'id': '42'
      };

      expect(await solutionsController.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all solutions', async () => {
      const result = {
        'data': 'TODO: implement solutions DELETE:id endpoint',
        'id': '42'
      };

      expect(await solutionsController.remove('42')).toEqual(result);
    });
  });
});

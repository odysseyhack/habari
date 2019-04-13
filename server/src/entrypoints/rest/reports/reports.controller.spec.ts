import { ReportsController } from './reports.controller';
import { ReportService } from '../../../entities/services/report/report.service';

describe('Reports Controller', () => {
  let reportsController: ReportsController;

  beforeEach(async () => {
    const reportService = new ReportService();
    reportsController = new ReportsController(reportService);
  });

  it('should be defined', () => {
    expect(reportsController).toBeDefined();
  });

  describe('create', () => {
    it('should return all reports', async () => {
      const result = { 'data': 'TODO: implement reports POST endpoint' };
      expect(await reportsController.create()).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all reports', async () => {
      const result = { 'data': 'TODO: implement reports GET endpoint' };
      expect(await reportsController.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all reports', async () => {
      const result = { 'data': 'TODO: implement reports GET:id endpoint', 'id': '42' };
      expect(await reportsController.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all reports', async () => {
      const result = { 'data': 'TODO: implement reports PUT:id endpoint', 'id': '42' };
      expect(await reportsController.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all reports', async () => {
      const result = { 'data': 'TODO: implement reports DELETE:id endpoint', 'id': '42' };
      expect(await reportsController.remove('42')).toEqual(result);
    });
  });
});

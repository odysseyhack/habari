import { ShipmentsController } from './shipments.controller';
import { ShipmentService } from '../../../entities/services/shipment/shipment.service';

describe('Shipments Controller', () => {
  let shipmentsController: ShipmentsController;

  beforeEach(async () => {
    const shipmentService = new ShipmentService();
    shipmentsController = new ShipmentsController(shipmentService);
  });

  it('should be defined', () => {
    expect(shipmentsController).toBeDefined();
  });

  describe('create', () => {
    it('should return all shipments', async () => {
      const result = { 'data': 'TODO: implement shipments POST endpoint' };
      expect(await shipmentsController.create()).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all shipments', async () => {
      const result = { 'data': 'TODO: implement shipments GET endpoint' };
      expect(await shipmentsController.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all shipments', async () => {
      const result = { 'data': 'TODO: implement shipments GET:id endpoint', 'id': '42' };
      expect(await shipmentsController.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all shipments', async () => {
      const result = { 'data': 'TODO: implement shipments PUT:id endpoint', 'id': '42' };
      expect(await shipmentsController.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all shipments', async () => {
      const result = { 'data': 'TODO: implement shipments DELETE:id endpoint', 'id': '42' };
      expect(await shipmentsController.remove('42')).toEqual(result);
    });
  });
});

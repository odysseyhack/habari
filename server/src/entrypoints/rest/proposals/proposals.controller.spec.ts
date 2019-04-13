import { ProposalsController } from './proposals.controller';
import { ProposalService } from '../../../entities/services/proposal/proposal.service';

describe('Proposals Controller', () => {
  let proposalsController: ProposalsController;

  beforeEach(async () => {
    const proposalService = new ProposalService();
    proposalsController = new ProposalsController(proposalService);
  });

  it('should be defined', () => {
    expect(proposalsController).toBeDefined();
  });

  describe('create', () => {
    it('should return all proposals', async () => {
      const result = { 'data': 'TODO: implement proposals POST endpoint' };
      expect(await proposalsController.create()).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all proposals', async () => {
      const result = { 'data': 'TODO: implement proposals GET endpoint' };
      expect(await proposalsController.findAll()).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return all proposals', async () => {
      const result = { 'data': 'TODO: implement proposals GET:id endpoint', 'id': '42' };
      expect(await proposalsController.findById('42')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return all proposals', async () => {
      const result = { 'data': 'TODO: implement proposals PUT:id endpoint', 'id': '42' };
      expect(await proposalsController.update('42')).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return all proposals', async () => {
      const result = { 'data': 'TODO: implement proposals DELETE:id endpoint', 'id': '42' };
      expect(await proposalsController.remove('42')).toEqual(result);
    });
  });
});

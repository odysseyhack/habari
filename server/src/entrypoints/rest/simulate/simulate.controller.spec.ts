import { Test, TestingModule } from '@nestjs/testing';
import { SimulateController } from './simulate.controller';

describe('Simulate Controller', () => {
  let controller: SimulateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulateController],
    }).compile();

    controller = module.get<SimulateController>(SimulateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should start a simulation', async () => {
      const result = {
        'data': 'TODO: implement simulate POST endpoint'
      };

      expect(await controller.simulate()).toEqual(result);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TestData } from './testData';
import { FarmerUsecases } from '../usecases/farmer.usecases';

describe('TestData', () => {
  let testData: TestData;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers:   [{ provide: FarmerUsecases, useValue: {createFarmer: (farmer) => farmer} }],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(testData.create()).toBe('Hello World!');
    });
  });
});

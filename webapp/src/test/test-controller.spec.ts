import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';
import { TestService } from './test.service';

describe('UnitController', () => {
  let controller: TestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [TestService],
    }).compile();

    controller = module.get<TestController>(TestController);
  });

  it('should return status 200 ok', () => {
    expect(controller.test()).toEqual({
      message: '200 OK',
    });
  });
});

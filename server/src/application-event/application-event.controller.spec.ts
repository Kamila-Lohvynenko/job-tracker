import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationEventController } from './application-event.controller';

describe('ApplicationEventController', () => {
  let controller: ApplicationEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationEventController],
    }).compile();

    controller = module.get<ApplicationEventController>(ApplicationEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

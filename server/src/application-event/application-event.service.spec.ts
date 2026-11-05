import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationEventService } from './application-event.service';

describe('ApplicationEventService', () => {
  let service: ApplicationEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationEventService],
    }).compile();

    service = module.get<ApplicationEventService>(ApplicationEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from '../events.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterService } from 'src/shared/filter/filter.service';
import { JwtService } from '@nestjs/jwt';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService, PrismaService, FilterService, JwtService],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

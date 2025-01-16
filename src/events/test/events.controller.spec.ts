import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from '../events.controller';
import { EventsService } from '../events.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterService } from 'src/shared/filter/filter.service';
import { JwtService } from '@nestjs/jwt';

describe('EventsController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService, PrismaService, FilterService, JwtService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

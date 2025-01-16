import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from '../events.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterService } from 'src/shared/filter/filter.service';
import { NotFoundException } from '@nestjs/common';

const generateMockEvent = () => ({
  id: 'cld1r1kpr000001lhd8vfd54k',
  title: 'Sample Event Title',
  description: 'This is a sample description for the event.',
  location: 'New York City',
  categories: ['Technology', 'Music'],
  eventDate: new Date('2025-12-25T10:00:00Z'),
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2025-01-01T10:00:00Z'),
});

describe('EventsService', () => {
  let service: EventsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    event: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockEvent = generateMockEvent();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        FilterService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a new event', async () => {
      mockPrismaService.event.create.mockResolvedValue(mockEvent);
      const createEventDto = {
        title: mockEvent.title,
        description: mockEvent.description,
        location: mockEvent.location,
        categories: mockEvent.categories,
        eventDate: mockEvent.eventDate,
      };
      const result = await service.create(createEventDto);
      expect(result).toEqual(mockEvent);
      expect(prisma.event.create).toHaveBeenCalledWith({
        data: createEventDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const mockEvents = [
        mockEvent,
        { ...mockEvent, id: '64b1d7f1c2a9f5001a987654' },
      ];
      mockPrismaService.event.findMany.mockResolvedValue(mockEvents);
      const result = await service.findAll({});
      expect(result).toEqual(mockEvents);
      expect(prisma.event.findMany).toHaveBeenCalledWith({});
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      mockPrismaService.event.findUnique.mockResolvedValue(mockEvent);
      const result = await service.findOne(mockEvent.id);
      expect(result).toEqual(mockEvent);
      expect(prisma.event.findUnique).toHaveBeenCalledWith({
        where: { id: mockEvent.id },
      });
    });

    it('should throw NotFoundException if event does not exist', async () => {
      mockPrismaService.event.findUnique.mockResolvedValue(null);
      await expect(service.findOne('nonexistentId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const updatedEvent = { ...mockEvent, title: 'Updated Title' };
      mockPrismaService.event.findUnique.mockResolvedValue(mockEvent);
      mockPrismaService.event.update.mockResolvedValue(updatedEvent);

      const updateEventDto = { title: updatedEvent.title };
      const result = await service.update(mockEvent.id, updateEventDto);

      expect(result).toEqual(updatedEvent);
      expect(prisma.event.update).toHaveBeenCalledWith({
        where: { id: mockEvent.id },
        data: updateEventDto,
      });
    });

    it('should throw NotFoundException if event does not exist', async () => {
      mockPrismaService.event.findUnique.mockResolvedValue(null);
      await expect(
        service.update('nonexistentId', { title: 'Updated Title' }),
      ).rejects.toThrow(NotFoundException);
      expect(prisma.event.findUnique).toHaveBeenCalledWith({
        where: { id: 'nonexistentId' },
      });
    });
  });

  describe('remove', () => {
    it('should delete an event', async () => {
      mockPrismaService.event.delete.mockResolvedValue(mockEvent);
      const result = await service.remove(mockEvent.id);
      expect(result).toBeUndefined();
      expect(prisma.event.delete).toHaveBeenCalledWith({
        where: { id: mockEvent.id },
      });
    });

    it('should throw NotFoundException if event does not exist', async () => {
      mockPrismaService.event.delete.mockRejectedValue(new Error());
      await expect(service.remove('nonexistentId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

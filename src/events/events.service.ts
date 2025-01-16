import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Event } from '@prisma/client';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}
  create(createEventDto: CreateEventDto): Promise<Event> {
    return this.prisma.event.create({ data: createEventDto });
  }

  findAll(args: any): Promise<Event[]> {
    return this.prisma.event.findMany(args);
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    try {
      return await this.prisma.event.update({
        where: {
          id,
        },
        data: updateEventDto,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.event.delete({
        where: {
          id,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
  }
}

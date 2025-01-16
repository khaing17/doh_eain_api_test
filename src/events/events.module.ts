import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [PrismaModule, SharedModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

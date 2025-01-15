import { Module } from '@nestjs/common';
import { FilterService } from './filter/filter.service';

@Module({
  providers: [FilterService],
  exports: [FilterService],
})
export class SharedModule {}

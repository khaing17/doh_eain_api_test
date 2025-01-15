import { Injectable, Logger } from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class FilterService {
  private readonly logger = new Logger(FilterService.name);
  generateFilter(filterDto: FilterDto): any {
    this.logger.debug(`generateFilter: ${JSON.stringify(filterDto)}`);
    const where = {};

    if (filterDto.search) {
      where['OR'] = [
        {
          title: { contains: filterDto.search, mode: 'insensitive' },
        },
        {
          description: { contains: filterDto.search, mode: 'insensitive' },
        },
      ];
    }

    if (filterDto.from) {
      where['eventDate'] = {
        gte: new Date(filterDto.from).toISOString(),
      };
    }

    if (filterDto.to) {
      where['eventDate'] = {
        ...where['eventDate'],
        lte: new Date(filterDto.to).toISOString(),
      };
    }

    if (filterDto.categories) {
      const categoriesArray = filterDto.categories
        .split(',')
        .map((c) => c.trim());
      if (categoriesArray.length > 0) {
        where['categories'] = {
          hasSome: categoriesArray,
        };
      }
    }
    return where;
  }
}

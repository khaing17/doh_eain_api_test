import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  location?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  categories: string[];

  @IsDateString()
  @IsNotEmpty()
  eventDate: Date;
}

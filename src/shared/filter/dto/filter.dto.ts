import {
  IsOptional,
  IsString,
  IsDateString,
  ValidateIf,
} from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  @ValidateIf((o) => o.from !== undefined)
  to?: string;

  @IsOptional()
  categories?: string;

  @IsOptional()
  @IsString()
  search?: string;
}

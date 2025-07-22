import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateParameterDTO {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  unit_name?: string;
  @IsObject()
  @IsOptional()
  meanings?: number[];
}

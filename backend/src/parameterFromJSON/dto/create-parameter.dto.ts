import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateParameterDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  unit_name?: string;
  @IsArray()
  meanings?: number[];
}

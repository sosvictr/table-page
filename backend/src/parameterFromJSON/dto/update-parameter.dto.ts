import { PartialType } from '@nestjs/mapped-types';
import { CreateParameterDTO } from './create-parameter.dto';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateParameterDTO extends PartialType(CreateParameterDTO) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

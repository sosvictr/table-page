import { PartialType } from '@nestjs/mapped-types';
import { CreateParameterDTO } from './create-parameter.dto';

export class UpdateParameterDto extends PartialType(CreateParameterDTO) {}

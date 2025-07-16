import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ParametersService } from './parameterFromJSON.service';
import { CreateParameterDTO } from './dto/create-parameter.dto';
import { UpdateParameterDto } from './dto/update-parameter.dto';

@Controller('parameters')
export class ParametersController {
  constructor(private readonly parameterService: ParametersService) {}

  @Get()
  getAll() {
    return this.parameterService.getAll();
  }

  @Post()
  addParameter(@Body() createParameter: CreateParameterDTO) {
    return this.parameterService.addParameter(createParameter);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: number,
  //   @Body() updateParameter: UpdateParameterDto,
  // ) {}

  // @Delete(':id')
  // remove(@Param('id') id: number) {}
}

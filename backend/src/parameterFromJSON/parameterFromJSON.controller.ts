import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ParametersService } from './parameterFromJSON.service';
import { CreateParameterDTO } from './dto/create-parameter.dto';
import { UpdateParameterDTO } from './dto/update-parameter.dto';

@Controller('parameters')
export class ParametersController {
  constructor(private readonly parameterService: ParametersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.parameterService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createParameter: Omit<CreateParameterDTO, 'id'>) {
    return await this.parameterService.create(createParameter);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParameter: UpdateParameterDTO,
  ) {
    return await this.parameterService.update(id, updateParameter);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.parameterService.remove(id);
  }
}

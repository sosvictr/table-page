import {
  Body,
  Controller,
  Get,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParametersService } from './parameterFromJSON.service';
import { CreateParameterDTO } from './dto/create-parameter.dto';

@Controller('parameters')
export class ParametersController {
  constructor(private readonly parameterService: ParametersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.parameterService.getAll();
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  replaceAll(@Body() newParameters: CreateParameterDTO[]) {
    this.parameterService.saveAll(newParameters);
    return { message: 'Переписали' };
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // addParameter(@Body() createParameter: CreateParameterDTO) {
  //   return { message: 'Добавили' };
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeParameter(@Param('id', ParseIntPipe) id: number) {
  //   return { message: 'Удалили' };
  // }
}

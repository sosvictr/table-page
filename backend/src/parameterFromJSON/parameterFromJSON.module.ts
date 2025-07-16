import { Module } from '@nestjs/common';
import { ParametersService } from './parameterFromJSON.service';
import { ParametersController } from './parameterFromJSON.controller';

@Module({
  controllers: [ParametersController],
  providers: [ParametersService],
  exports: [ParametersService],
})
export class ParameterModule {}

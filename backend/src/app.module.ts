import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParameterModule } from './parameterFromJSON/parameterFromJSON.module';

@Module({
  imports: [ParameterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

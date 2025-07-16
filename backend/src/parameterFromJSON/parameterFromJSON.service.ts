import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateParameterDTO } from './dto/create-parameter.dto';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateParameterDto } from './dto/update-parameter.dto';

@Injectable()
export class ParametersService {
  addParameter(createParameter: CreateParameterDTO): void {
    console.log(createParameter);
    /// if (exist) {throw exception}
  }
  getAll() {
    try {
      const dataPath = path.join(
        process.cwd(),
        'src',
        'parameterFromJSON',
        'data.json',
      );
      if (!fs.existsSync(dataPath)) {
        throw new Error(`File not found at path: ${dataPath}`);
      }
      const rawData = fs.readFileSync(dataPath, 'utf8');
      const data = JSON.parse(rawData) as CreateParameterDTO[];
      return data;
    } catch (error) {
      console.error('Ошибка при чтении data.json:', error);
      throw new InternalServerErrorException(
        'Не удалось загрузить данные показателей.',
      );
    }
  }

  update(id: number, updateParameter: UpdateParameterDto): void {
    console.log(`Change parameter id ${id}`);
    console.log(updateParameter);
  }

  remove(id: number): void {
    console.log(`Delete parameter ${id}`);
  }
}

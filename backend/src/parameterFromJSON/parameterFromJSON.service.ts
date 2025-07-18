import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateParameterDTO } from './dto/create-parameter.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ParametersService {
  dataFilePath: string;

  constructor() {
    this.dataFilePath = path.join(
      process.cwd(),
      'src',
      'parameterFromJSON',
      'data.json',
    );
  }

  async readDataFromJSON(): Promise<CreateParameterDTO[]> {
    try {
      try {
        await fs.access(this.dataFilePath);
      } catch (error) {
        console.warn(`Файл data.json не найден по пути: ${this.dataFilePath}.`);
      }
      const rawData = await fs.readFile(this.dataFilePath, 'utf8');
      return JSON.parse(rawData) as CreateParameterDTO[];
    } catch (error) {
      console.error('Ошибка при чтении data.json:', error);
      throw new InternalServerErrorException(
        'Не удалось загрузить данные показателей.',
      );
    }
  }

  async getAll(): Promise<CreateParameterDTO[]> {
    return await this.readDataFromJSON();
  }

  async writeDataToFile(dataToSave: CreateParameterDTO[]): Promise<void> {
    try {
      const jsonData = JSON.stringify(dataToSave, null, 2);
      await fs.writeFile(this.dataFilePath, jsonData, 'utf8');
      console.log('Данные сохранены в data.json');
    } catch (error) {
      console.error('Ошибка при сохранении data.json:', error);
      throw new InternalServerErrorException(
        'Не удалось сохранить данные показателей.',
      );
    }
  }

  async saveAll(newParameters: CreateParameterDTO[]): Promise<void> {
    await this.writeDataToFile(newParameters);
  }

  addParameter(newParameter: CreateParameterDTO): void {
    console.log('Надо добавить парметр: ', newParameter);
  }

  removeParameter(id: number): void {
    console.log(`Надо удалить как-то параметр с id: ${id}`);
  }
}

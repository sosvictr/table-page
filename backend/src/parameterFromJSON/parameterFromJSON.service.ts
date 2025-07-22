import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateParameterDTO } from './dto/create-parameter.dto';
import { UpdateParameterDTO } from './dto/update-parameter.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ParametersService implements OnModuleInit {
  private dataFilePath: string;
  private parameters: CreateParameterDTO[] = [];

  constructor() {
    this.dataFilePath = path.join(
      process.cwd(),
      'src',
      'parameterFromJSON',
      'data.json',
    );
  }

  async onModuleInit() {
    await this.loadDataFromFile();
  }

  private async loadDataFromFile(): Promise<void> {
    try {
      try {
        await fs.access(this.dataFilePath);
      } catch (error) {
        this.parameters = [];
      }
      const rawData = await fs.readFile(this.dataFilePath, 'utf8');
      this.parameters = JSON.parse(rawData) as CreateParameterDTO[];
    } catch (error) {
      this.parameters = [];
    }
  }

  getAll(): CreateParameterDTO[] {
    return this.parameters;
  }

  private async writeDataToFile(): Promise<void> {
    try {
      const jsonData = JSON.stringify(this.parameters, null, 2);
      await fs.writeFile(this.dataFilePath, jsonData, 'utf8');
    } catch (error) {
      throw new InternalServerErrorException('Не удалось сохранить данные.');
    }
  }

  async create(
    createDto: Omit<CreateParameterDTO, 'id'>,
  ): Promise<CreateParameterDTO> {
    const maxId =
      this.parameters.length > 0
        ? Math.max(...this.parameters.map((p) => p.id || 0))
        : 0;
    const newId = maxId + 1;
    const newParameter: CreateParameterDTO = { id: newId, ...createDto };
    this.parameters.push(newParameter);
    await this.writeDataToFile();
    return newParameter;
  }

  async update(
    id: number,
    updateDto: UpdateParameterDTO,
  ): Promise<CreateParameterDTO> {
    const index = this.parameters.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`Параметр с id=${id} не найден.`);
    }

    this.parameters[index] = {
      ...this.parameters[index],
      ...updateDto,
      id: id,
    };
    await this.writeDataToFile();
    return this.parameters[index];
  }

  async remove(id: number): Promise<void> {
    const initialLength = this.parameters.length;
    this.parameters = this.parameters.filter((p) => p.id !== id);

    if (this.parameters.length === initialLength) {
      throw new NotFoundException(`Параметр с id=${id} не найден.`);
    }
    await this.writeDataToFile();
  }
}

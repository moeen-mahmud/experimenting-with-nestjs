import { Cat } from './../interfaces/cat.interface';
import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCatDTO, UpdateCatDTO } from './cat.dto';

@Controller('cats')
export class CatsController {
  //* injecting cat service into the CatsController
  constructor(private catsService: CatsService) {}

  // post request
  @Post()
  async create(@Body() createCatDto: CreateCatDTO) {
    this.catsService.create(createCatDto);
  }

  // Get request
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // Get by id
  @Get(':id')
  findOne(@Param(':id') id: string) {
    return `This returns #${id} of cats`;
  }

  // Put by id
  @Put(':id')
  update(@Param(':id') id: string, @Body() updateCatDto: UpdateCatDTO) {
    const { age, breed, name } = updateCatDto;
    return `This returns the updated ${name}, ${breed}, and ${age} of #${id} cat`;
  }

  // Delete by id
  @Delete(':id')
  delete(@Param(':id') id: string) {
    return `This action removes #${id} cat`;
  }
}

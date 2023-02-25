import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from './../filters/http-exception.filter';
import { CatsService } from './cats.service';
import { CreateCatDTO, UpdateCatDTO } from './dto/cat.dto';

@Controller('cats')
// @UseFilters(HttpException) // 👉 we can also make it as controller scoped
//* For making it as a global scoped, see the implementations in main.ts file.
export class CatsController {
  //* injecting cat service into the CatsController
  constructor(private catsService: CatsService) {}

  // post request
  @Post()
  //* decorator @UseFilters helps us to use the exception filters, here if we don't want to pass the
  //* here if we don't want to pass the custom exception filter as an instance, we can directly pass as @UseFilters(HttpExceptionFilter) it's preferable. Reduces memory usage.
  //* if we do that, we'll leave the responsibility of instantiation and enabling the dependency injection.
  @UseFilters(HttpExceptionFilter)
  async create(@Body() createCatDto: CreateCatDTO) {
    this.catsService.create(createCatDto);
    try {
      this.catsService.create(createCatDto);
    } catch (error) {
      throw new ForbiddenException(); //calling the ForbiddenException class
    }
  }

  // Get request
  @Get()
  async findAll() {
    // return this.catsService.findAll(); // currently returns empty array
    //* Below the HttpException is a helper class for handling API exceptions in a standard way.
    //* The first constructor argument takes the response which defines the JSON response body (can be string or object), and the second constructor argument takes the http status code.
    //* We're using the HttpStatus enum to ge the associated code.
    //* There is also a third constructor argument which is optional. which is the object that has has a property called, 'cause:'.
    //* We can pass the cause as the error .
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); // 👉 throwing exception
    //* by default the response object has two properties: status and message.
    //* ⭐ Refined version 👇
    try {
      const response = await this.catsService.findAll();
      return response;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cats are forbidden for now',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
          description: 'Cat error description',
        },
      );
    }
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

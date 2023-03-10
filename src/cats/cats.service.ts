import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
/**
 * * Services are responsible for creating storage and retrieval of data
 */
@Injectable()
//* attaches metadata, enables the CatsService class that can be managed by the Nest inversion of control (IoC) container.
//* 👉 https://en.wikipedia.org/wiki/Inversion_of_control
export class CatsService {
  private readonly cats: Cat[] = [
    {
      id: 1,
      age: 20,
      name: 'Bhootu',
      breed: 'Bengali',
    },
  ];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number) {
    return this.cats[id];
  }
}

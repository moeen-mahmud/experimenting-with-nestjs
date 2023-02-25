import { HttpException, HttpStatus } from '@nestjs/common';

//* 💡 The below class extends the HttpException,
//* so it'll work seamlessly with the built-in one
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

//* # Refer http-exception.filter.ts after this.

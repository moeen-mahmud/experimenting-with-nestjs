import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// 👇 NestJS supports dependency injections, available within the same module like providers and controllers.
// * done through the CLASS
// 👉 See this middleware implementations in the app.module.ts file!
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`);
    next();
  }
}

//*💡 We can also create a functional middleware like bellow,
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Requesting functional...`);
  next();
}

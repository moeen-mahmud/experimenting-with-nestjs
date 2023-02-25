import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//* enable when the exception is activated.
// import { HttpExceptionFilter } from './filters/http-exception.filter';
// import { logger } from './logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger); // 👉 Applying middleware for all routes
  // app.useGlobalFilters(new HttpExceptionFilter()); // 👉 making it global scoped
  //! The useGlobalFilters() method does not set up filters for gateways or hybrid applications.
  await app.listen(8000);
}
bootstrap();

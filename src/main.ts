import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { logger } from './logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger); // 👉 Applying middleware for all routes
  await app.listen(8000);
}
bootstrap();

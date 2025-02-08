// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  if (!port) {
    throw new Error('PORT environment variable is not defined');
  }
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}

bootstrap();

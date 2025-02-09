import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set a global prefix
  app.setGlobalPrefix('api');

  // Enable API versioning using URI versioning (e.g., /v1/...)
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  // });

  const port = process.env.PORT;
  if (!port) {
    throw new Error('PORT environment variable is not defined');
  }

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Swagger endpoint changed to avoid conflict with the global prefix
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import appConfig from './config/app.config';
import { AuthModule } from './auth/auth.module';
import { OrganizerModule } from './apps/organizer/organizer.module';
import { MemberModule } from './apps/member/member.module';
import { DriverModule } from './apps/driver/driver.module';
import { SupervisorModule } from './apps/supervisor/supervisor.module';
import { AdminModule } from './apps/admin/admin.module';

async function setupSwagger(app) {
  const modules = [
    { name: 'member', module: MemberModule },
    { name: 'organizer', module: OrganizerModule },
    { name: 'driver', module: DriverModule },
    { name: 'supervisor', module: SupervisorModule },
    { name: 'admin', module: AdminModule },
  ];

  modules.forEach(({ name, module }) => {
    const config = new DocumentBuilder()
      .setTitle(`${name} API Documentation`)
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional, depending on how you're generating the token
        },
        'Bearer', // Name of the token in the header
      )
      .build();

    const document = SwaggerModule.createDocument(app, config, {
      include: [module, AuthModule],
    });

    SwaggerModule.setup(`api-docs/${name}`, app, document);
  });
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await setupSwagger(app);
  app.enableCors();
  const port = appConfig().PORT;
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}

bootstrap();

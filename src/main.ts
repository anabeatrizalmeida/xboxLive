import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('xbox Live Server')
    .setDescription('Application inspired by the xbox live platform')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('game')
    .addTag('genre')
    .addTag('user')
    .addTag('profile')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3333;
  await app.listen(port);
}
bootstrap();

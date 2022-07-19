import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('xboxLive')
    .setDescription(`Xbox Live-inspired app, Microsoft's platform for the Xbox video game console.`)
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('games')
    .addTag('genres')
    .addTag('profiles')
    .addTag('users')
    .addTag('homepage')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3333);
}
bootstrap();

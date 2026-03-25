import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Property Management API')
    .setDescription('API for managing hotels, rooms, and bookings')
    .setVersion('1.0')
    .addTag('hotels')
    .addTag('rooms')
    .addTag('guests')
    .addTag('bookings')
    .addTag('payments')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);  
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();

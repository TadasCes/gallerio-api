import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import { ConfigService } from 'nestjs-dotenv';
import { EmailUtility } from './users/utility/email.utility';
import multer from 'multer';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  const options = new DocumentBuilder()
    .setTitle('Users and movies')
    .setDescription('description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors()
  await app.listen(3000);
  
  const emails = new EmailUtility()
  
  emails.sendANewEmail().catch(console.error)
}


bootstrap();

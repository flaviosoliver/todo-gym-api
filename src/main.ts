import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000;

  const swaggerInfos = {
    description: {
      text: 'API da aplicação To-do Gym, construída em NodeJS, utilizando o framework NestJS na linguagem TypeScript',
    },
    contact: {
      name: 'Flávio Oliveira',
      url: 'https://flaviosoliver-portfolio.vercel.app/',
      email: 'flavsoliver@gmail.com',
    },
  };

  const corsOptions: CorsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.use(express.static(join(__dirname, '..', 'documentation')));

  const config = new DocumentBuilder()
    .setTitle('To-do Gym')
    .setDescription(swaggerInfos.description.text)
    .setVersion('1.0')
    .setContact(
      swaggerInfos.contact.name,
      swaggerInfos.contact.url,
      swaggerInfos.contact.email
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT);
}
bootstrap();

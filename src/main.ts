import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

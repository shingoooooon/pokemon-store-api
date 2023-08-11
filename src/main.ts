import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.WEB_URL,
    credentials: true,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Pokemon store')
    .setDescription('Pokemon store API description')
    .setVersion('1.0')
    .addTag('pokemons')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: {
      withCredentials: true,
    },
  });

  await app.listen(8000);
}

bootstrap();

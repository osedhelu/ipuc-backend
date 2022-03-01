import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';
import { json, urlencoded } from 'express';
// import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.useWebSocketAdapter(new WsAdapter(app));

  app.setGlobalPrefix('api')
  app.use(urlencoded({ extended: true }));
  app.use(json());
  const config = new DocumentBuilder()
    .setTitle('Yafuz Docs')
    .setDescription('The yafuz API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

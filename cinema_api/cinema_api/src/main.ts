import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://127.0.0.1:5500', // Replace with your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useStaticAssets(resolve(__dirname, '..', 'public'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

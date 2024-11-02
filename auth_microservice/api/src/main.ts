import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// hna api gateway to connect with other services
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3200);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

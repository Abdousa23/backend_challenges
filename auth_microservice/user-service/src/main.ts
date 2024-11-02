import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
// connecting to user service using tcp
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3001
    }
  })

  await app.startAllMicroservices()
  await app.listen(process.env.PORT ?? 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

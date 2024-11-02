import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
// importing user service usin tcp
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule { }

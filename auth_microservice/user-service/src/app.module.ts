import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config();
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }


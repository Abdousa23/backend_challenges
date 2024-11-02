import { Module } from '@nestjs/common';
import { SeatsModule } from './seats/seats.module';
require('dotenv').config();
@Module({
    imports: [SeatsModule],
    controllers: [],
    providers: [],
})
export class AppModule { }


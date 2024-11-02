import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsGateway } from './seats.gateway';

@Module({
    imports: [],
    controllers: [],
    providers: [SeatsService, SeatsGateway],
})
export class SeatsModule { }
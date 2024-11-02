import { SeatsService } from './seats.service';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
export declare class SeatsGateway {
    private readonly seatsService;
    private server;
    constructor(seatsService: SeatsService);
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    create(data: any, client: Socket): void;
    getSeats(data: {
        date: string;
        time: string;
    }, client: Socket): void;
}

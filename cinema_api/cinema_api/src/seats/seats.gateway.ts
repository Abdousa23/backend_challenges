import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { SeatsService } from './seats.service';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: 'http://127.0.0.1:5500', // Replace with your frontend's origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class SeatsGateway {
  private server: Server;
  constructor(private readonly seatsService: SeatsService) { }

  afterInit(server: Server) {
    this.server = server;
  }
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('reserveSeat')
  create(@MessageBody() data: any,
    @ConnectedSocket() client: Socket) {
    console.log('Reserve seat event received');
    console.log(data);
    const updatedSeats = this.seatsService.reserveSeats(data.date, data.time, data.seats);
    console.log('updatedSeats', updatedSeats);
    const reservingData = { date: data.date, time: data.time, seats: data.seats };
    this.server.emit('seatsReserved', reservingData);


  }
  @SubscribeMessage('getSeats')
  getSeats(@MessageBody() data: { date: string, time: string }, @ConnectedSocket() client: Socket) {
    console.log('getSeats', data);
    const availableSeats = this.seatsService.getsSeats(data);
    client.emit('initialSeats', availableSeats);
  }
}

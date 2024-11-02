"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const seats_service_1 = require("./seats.service");
const socket_io_1 = require("socket.io");
let SeatsGateway = class SeatsGateway {
    constructor(seatsService) {
        this.seatsService = seatsService;
    }
    afterInit(server) {
        this.server = server;
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    create(data, client) {
        console.log('Reserve seat event received');
        console.log(data);
        const updatedSeats = this.seatsService.reserveSeats(data.date, data.time, data.seats);
        console.log('updatedSeats', updatedSeats);
        const reservingData = { date: data.date, time: data.time, seats: data.seats };
        this.server.emit('seatsReserved', reservingData);
    }
    getSeats(data, client) {
        console.log('getSeats', data);
        const availableSeats = this.seatsService.getsSeats(data);
        client.emit('initialSeats', availableSeats);
    }
};
exports.SeatsGateway = SeatsGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('reserveSeat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], SeatsGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getSeats'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], SeatsGateway.prototype, "getSeats", null);
exports.SeatsGateway = SeatsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: 'http://127.0.0.1:5500',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [seats_service_1.SeatsService])
], SeatsGateway);
//# sourceMappingURL=seats.gateway.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatsService = void 0;
const common_1 = require("@nestjs/common");
let SeatsService = class SeatsService {
    constructor() {
        const seatIds = [
            'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12',
            'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24',
            'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12',
            'R13', 'R14', 'R15', 'R16', 'R17', 'R18', 'R19', 'R20', 'R21', 'R22', 'R23', 'R24'
        ];
        const times = ['20:00', '20:45', '22:00'];
        const today = new Date().toISOString().split('T')[0];
        this.movie = {};
        this.movie[today] = {};
        times.forEach(time => {
            this.movie[today][time] = {};
            seatIds.forEach(seatId => {
                this.movie[today][time][seatId] = true;
            });
        });
    }
    initializeSeatsForDateAndTime(date, time) {
        const seatIds = [
            'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12',
            'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24',
            'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12',
            'R13', 'R14', 'R15', 'R16', 'R17', 'R18', 'R19', 'R20', 'R21', 'R22', 'R23', 'R24'
        ];
        if (!this.movie[date]) {
            this.movie[date] = {};
        }
        if (!this.movie[date][time]) {
            this.movie[date][time] = {};
            seatIds.forEach(seatId => {
                this.movie[date][time][seatId] = true;
            });
        }
    }
    reserveSeats(date, time, seatIds) {
        this.initializeSeatsForDateAndTime(date, time);
        console.log('here');
        console.log(date, time, seatIds);
        console.log("movie");
        console.log(this.movie);
        seatIds.forEach(seatId => {
            if (this.movie[date][time][seatId]) {
                this.movie[date][time][seatId] = false;
            }
        });
        return this.movie[date][time];
    }
    getsSeats(data) {
        const { date, time } = data;
        console.log(this.movie);
        if (!this.movie[date] || !this.movie[date][time]) {
            return {};
        }
        return this.movie[date][time];
    }
};
exports.SeatsService = SeatsService;
exports.SeatsService = SeatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SeatsService);
//# sourceMappingURL=seats.service.js.map
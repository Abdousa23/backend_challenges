export declare class SeatsService {
    private movie;
    constructor();
    private initializeSeatsForDateAndTime;
    reserveSeats(date: string, time: string, seatIds: string[]): {
        [seatId: string]: boolean;
    };
    getsSeats(data: any): {
        [seatId: string]: boolean;
    };
}

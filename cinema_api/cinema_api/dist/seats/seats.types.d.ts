export interface Movie {
    [date: string]: {
        [time: string]: {
            [seatId: string]: boolean;
        };
    };
}

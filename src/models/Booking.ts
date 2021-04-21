export interface Booking {
    id: number;
    master: {
        id: number;
        firstName: string;
        lastName: string;
        secondName?: string;
    };
    procedure: {
        id: number;
        name: string;
    };
    start: Date;
    finish: Date;
}
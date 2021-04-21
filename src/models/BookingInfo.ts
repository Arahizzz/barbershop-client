export interface BookingInfo {
  procedureId?: number;
  masterId?: number;
  dateTime?: Date;
  customerId?: number;
}

export interface ProcedureBooking extends BookingInfo {
  procedureId: number;
}

export interface MasterBooking extends ProcedureBooking {
  masterId: number;
}

export interface DateTimeBooking extends MasterBooking {
  dateTime: Date;
}

export interface CustomerBooking extends DateTimeBooking {
  customerId: number;
}
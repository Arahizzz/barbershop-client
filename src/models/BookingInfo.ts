export interface BookingInfo {
  procedureId?: number;
  masterId?: number;
  dateTime?: Date;
}

export interface ProcedureBooking extends BookingInfo {
  procedureId: number;
}

export interface MasterBooking extends ProcedureBooking {
  masterId: number;
}

export interface DateTime extends MasterBooking {
  dateTime: Date;
}
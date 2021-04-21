import { TimeSlot } from "../models/TimeSlot";
import axios from "axios";
import { apiURL } from "./constants";
import { CustomerBooking } from "../models/BookingInfo";
import { Booking } from "../models/Booking";

export async function getTimeSlots(
  master: number,
  procedure: number,
  start: Date,
  end: Date
): Promise<TimeSlot[]> {
  const response = await axios.get<{ time: string; free: boolean }[]>(
    `${apiURL}/timeSlots`,
    {
      params: {
        master,
        procedure,
        start,
        end,
      },
    }
  );
  return response.data.map((r) => new TimeSlot(new Date(r.time), r.free));
}

export async function addBooking(booking: CustomerBooking): Promise<void> {
  await axios.post(`${apiURL}/records/add`, booking, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
}

type BookingResponse = Omit<Booking, "start" | "finish"> & {
  start: string;
  finish: string;
};

function mapBooking(resp: BookingResponse): Booking {
  return {
    id: resp.id,
    master: resp.master,
    procedure: resp.procedure,
    start: new Date(resp.start),
    finish: new Date(resp.finish),
  };
}

export async function getBooking(id: number | string): Promise<Booking> {
  const response = await axios.get<BookingResponse>(`${apiURL}/records`, {
    params: { id },
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });
  const booking = response.data;
  return mapBooking(booking);
}

export async function getCustomerBookings(): Promise<Booking[]> {
  const response = await axios.get<BookingResponse[]>(`${apiURL}/records/my`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });
  return response.data.map(mapBooking);
}
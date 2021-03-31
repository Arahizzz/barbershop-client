import { TimeSlot } from "../models/TimeSlot";
import axios from "axios";
import { apiURL } from "./constants";

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

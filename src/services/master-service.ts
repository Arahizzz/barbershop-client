import { Master, MasterFilter } from "../models/Master";
import axios from "axios";
import { apiURL } from "./constants";

export async function getMasters(procedureId: number, filter: MasterFilter): Promise<Master[]> {
  const response = await axios.get<Master[]>(`${apiURL}/masters`, {
    params: {
      procedureId, ...filter
    }
  });
  return response.data;
}

export async function getMaster(masterId: number | string): Promise<Master> {
  const response = await axios.get<Master>(`${apiURL}/masters/${masterId}`);
  return response.data;
}

import { Master } from "../models/Master";
import axios from "axios";
import { apiURL } from "./constants";

export async function getMasters(procedureId: number): Promise<Master[]> {
  const response = await axios.get<Master[]>(`${apiURL}/masters`, {
    params: {
      procedureId
    }
  });
  return response.data;
}

export async function getMaster(masterId: number): Promise<Master> {
  const response = await axios.get<Master>(`${apiURL}/masters/${masterId}`);
  return response.data;
}

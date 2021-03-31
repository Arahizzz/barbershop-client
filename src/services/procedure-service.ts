import { Procedure } from "../models/Procedure";
import axios from "axios";
import { apiURL } from "./constants";

export async function getProcedures(): Promise<Procedure[]> {
  const response = await axios.get<Procedure[]>(`${apiURL}/procedures`);
  return response.data;
}

export async function getProcedure(procedureId: number): Promise<Procedure> {
  const response = await axios.get<Procedure>(`${apiURL}/procedures/${procedureId}`);
  return response.data;
}

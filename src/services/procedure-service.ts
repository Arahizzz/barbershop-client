import { Procedure, ProcedureFilter } from "../models/Procedure";
import axios from "axios";
import { apiURL } from "./constants";

export async function getProcedures(filter: ProcedureFilter): Promise<Procedure[]> {
  const response = await axios.get<Procedure[]>(`${apiURL}/procedures`, {
    params: filter
  });
  return response.data;
}

export async function getProcedure(procedureId: number): Promise<Procedure> {
  const response = await axios.get<Procedure>(`${apiURL}/procedures/${procedureId}`);
  return response.data;
}

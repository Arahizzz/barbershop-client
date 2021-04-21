import axios from "axios";
import { Credentials } from "../models/Credentials";
import { apiURL } from "./constants";
import { AccountInfo, MasterInfo, RegisterForm } from "../models/Account";

export async function getAccount(): Promise<AccountInfo | null> {
  try {
    const response = await axios.get<AccountInfo>(`${apiURL}/account/`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function login(credentials: Credentials): Promise<void> {
  const response = await axios.post<{ token: string }>(
    `${apiURL}/auth`,
    credentials
  );
  sessionStorage.setItem("token", response.data.token);
}

export async function register(account: RegisterForm): Promise<void> {
  await axios.post(`${apiURL}/register/customer`, account);
}

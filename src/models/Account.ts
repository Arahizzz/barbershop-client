import { Credentials } from "./Credentials";

export const enum Gender {
  Male = "m",
  Female = "f",
}

export interface MasterInfo {
  firstName: string;
  secondName: string;
  lastName: string;
  age: number;
  gender: Gender;
}

export interface AccountInfo {
  accountId: number;
  firstName: string;
  secondName: string;
  lastName: string;
  email: string;
  age: number;
  gender: Gender;
  phoneNumber: string;
}

export type RegisterForm = AccountInfo & Credentials & { confirmPassword: string };

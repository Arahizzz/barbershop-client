import { Sort } from "./Sort";

export const enum Level {
  Trainee = 1,
  Master = 2,
}

export interface Master {
  accountId: number;
  firstName: string;
  secondName: string;
  lastName: string;
  experience: number;
  rating: number;
  levelId: number;
  photo: string;
}

export interface MasterFilter {
  levelId?: Level | "";
  sort?: Sort<Pick<Master, "rating">> | "";
}

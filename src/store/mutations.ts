import { BookingInfo } from "src/models/BookingInfo";

export enum BookingMutations {
  SELECT_PROCEDURE = "SELECT_PROCEDURE",
  SELECT_MASTER = "SELECT_MASTER",
  SELECT_DATETIME = "SELECT_DATETIME",
  CONFIRM_CUSTOMER = "CONFIRM_CUSTOMER"
}

export type Mutations<S = BookingInfo> = {
  [BookingMutations.SELECT_PROCEDURE](state: S, payload: number): void;
  [BookingMutations.SELECT_MASTER](state: S, payload: number): void;
  [BookingMutations.SELECT_DATETIME] (state: S, payload: Date): void;
  [BookingMutations.CONFIRM_CUSTOMER](state: S, payload: number): void;
};

export const mutations: Mutations = {
  [BookingMutations.SELECT_PROCEDURE](state, payload) {
    state.procedureId = payload;
    state.masterId = state.dateTime = undefined;
  },
  [BookingMutations.SELECT_MASTER](state, payload) {
    state.masterId = payload;
    state.dateTime = undefined;
  },
  [BookingMutations.SELECT_DATETIME](state, payload) {
    state.dateTime = payload;
  },
  [BookingMutations.CONFIRM_CUSTOMER] (state, payload) {
    state.customerId = payload;
  }
};

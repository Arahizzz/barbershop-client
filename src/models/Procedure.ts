import { Sort } from "./Sort";

export class Procedure {
  public constructor(
    public procedureId: number,
    public name: string,
    public price: number,
    public duration: number
  ) {}
}

export interface ProcedureFilter {
  priceFrom?: number;
  priceTo?: number;
  sort?: Sort<Pick<Procedure, 'duration' | 'price'>> | ''
}
export enum Gender {
    Male = "m",
    Female = "f"
}

export class AccountInfo {
  public constructor(
    public accountId: number,
    public firstName: string,
    public secondName: string,
    public lastName: string,
    public age: number,
    public gender: Gender
  ) {}
}

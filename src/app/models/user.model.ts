
export class UserModel {
  constructor(
    public name: string,
    public lastname: string,
    public email: string,
    public password?: string,
    public img?: string,
    public role?: string,
    public google?: boolean,
    public _id?: string

  ) { }
}

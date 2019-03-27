export interface AuthResp {
  id: string,
  signed_user: LoggedInResp.Credentials
  token: string
  expiresIn: number;
}

export namespace LoggedInResp {
  export interface Credentials {
    username: string;
    password: string;
  }
}

export interface ISignupPayload {
    email: string;
    username: string;
    password: string;
}

export interface ISignupResponse {
  email: string;
  username: string;
  token: string;
}

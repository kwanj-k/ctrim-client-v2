export interface ISignupPayload {
    email: string;
    username: string;
    password: string;
    confirm_password: string;
}

export interface ISignupResponse {
  email: string;
  username: string;
  token: string;
}

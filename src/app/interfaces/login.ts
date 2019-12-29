export interface ILoginPayload {
    email: string;
    password: string;
}

export interface ILoginResponse {
    email: string;
    token: string;
    status: string;
}

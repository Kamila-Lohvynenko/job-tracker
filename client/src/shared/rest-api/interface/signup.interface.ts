import { IApiResponse } from "./common";

export enum ESignupApi {
  API_SIGNUP = "auth/signup",
}

export enum ESignupKey {
  SIGNUP_MUTATION = "signup_mutation",
}

export interface ISignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface ISignupResponse extends IApiResponse {
  message: string;
}

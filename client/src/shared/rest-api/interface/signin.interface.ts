import { IApiResponse } from "./common";

export enum ESigninApi {
  API_SIGNIN = "auth/signin",
}

export enum ESigninKey {
  SIGNIN_MUTATION = "signin_mutation",
}

export interface ISigninRequest {
  email: string;
  password: string;
}

export interface ISigninResponse extends IApiResponse {
  message: string;
}

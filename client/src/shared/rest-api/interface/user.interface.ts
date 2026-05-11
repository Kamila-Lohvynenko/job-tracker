import { IApiResponse } from "./common";

export enum EUserApi {
  API_USER = "/user/me",
}

export enum EUserKey {
  USER_QUERY = "user_query",
}

export interface IUserDto {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUserResponse extends IApiResponse {
  data: IUserDto;
}

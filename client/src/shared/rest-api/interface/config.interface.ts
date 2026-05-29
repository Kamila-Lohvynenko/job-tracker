import { IApiResponse } from "./common";

export enum EConfigKey {
  CONFIG_QUERY = "config_query",
  CONFIG_MUTATION = "config_mutation",
}

export enum EConfigApi {
  API_CONFIG = "config",
}

export interface IConfigDto {
  isSidebarOpen: boolean;
}

export interface IConfigRequest {
  isSidebarOpen: boolean;
}

export interface IConfigResponse extends IApiResponse {
  data: IConfigDto;
}

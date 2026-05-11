export interface IApiResponse {
  success: boolean;
  status: number;
  message?: string;
  errors?: string[];
}

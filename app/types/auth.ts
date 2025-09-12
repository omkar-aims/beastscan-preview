import type { User } from "./user";

export interface LoginResponse {
  token: string;
  refresh_token: string;
  refresh_token_expiration: number;
}

export interface UserProfileResponse {
  status: "ok";
  result: User;
}

export interface RegisterSuccessResponse {
  status: "ok";
  result: User;
}

export interface RegisterErrorResponse {
  status: "error";
  result: {
    message: string;
  };
}

export type RegisterResponse = RegisterSuccessResponse | RegisterErrorResponse;
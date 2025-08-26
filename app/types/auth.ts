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

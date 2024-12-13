import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
} from "./../auth/Auth.Interface";

export interface AuthApiClientInterface {
  authenticateUser: (payload: LoginRequest) => Promise<LoginResponse>;
  logout: (payload: LogoutRequest) => Promise<LogoutResponse>;
}

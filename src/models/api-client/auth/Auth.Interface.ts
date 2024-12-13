export interface LoginRequest {
  password: string;
  email: string;
}

export interface LoginResponse {
  data: LoginResponseData;
  status_code: number;
}

export interface LoginResponseData {
  email: string;
  full_name: string;
  access_token: string;
  refresh_token: string;
}

export interface LogoutRequest {
  refresh_token: string;
}

export interface LogoutResponse {
  data: LogoutRespData;
  status_code: number;
}

export interface LogoutRespData {
  message: string;
}

export interface SignUp {
  id: string;
  username: string;
  password: string;
  email: string;
  gender?: string;
  age?: number;
  phone: string;
  firstName: string;
  lastName: string;
  refreshToken?: string;
}

export interface SignIn {
  username: string;
  password: string;
}

export interface AuthProfile {
  isAuthenticated: boolean;
  authToken: string;
}

export interface ErrorResponse {
  statusCode: string;
  message: string;
}

// REGISTRATION REGION

export interface UserData {
  email: string;
  phone: string;
  last_login: any;
  id: string;
  is_deactivated: boolean;
  activated: boolean;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  user_id: string;
  role: string;
}

export interface PasswordResetRequestResponse {
  status: string;
  message: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  password: string;
}

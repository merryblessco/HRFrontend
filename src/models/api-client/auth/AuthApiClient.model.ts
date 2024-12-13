import { type AuthApiClientUrlsInterface } from "./../auth/AuthApiClientUrls.interface";
import { type AuthApiClientInterface } from "./../auth/AuthApiClient.interface";
import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
} from "./../auth/Auth.Interface";
import {
  HttpClient,
  type HttpRequestParamsInterface,
} from "./../../http-client";

export class AuthApiClientModel implements AuthApiClientInterface {
  private readonly urls!: AuthApiClientUrlsInterface;
  constructor(urls: AuthApiClientUrlsInterface) {
    this.urls = urls;
  }

  authenticateUser(payload: LoginRequest): Promise<LoginResponse> {
    const postParameters: HttpRequestParamsInterface = {
      url: this.urls.authenticateUser,
      requiresToken: false,
      payload: payload,
    };
    return HttpClient.post<LoginResponse>(postParameters);
  }

  logout(payload: LogoutRequest): Promise<LogoutResponse> {
    const postParameters: HttpRequestParamsInterface = {
      url: this.urls.logout,
      requiresToken: false,
      payload: payload,
    };
    return HttpClient.post<LogoutResponse>(postParameters);
  }
}

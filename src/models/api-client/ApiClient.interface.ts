import { type AiApiClientInterface } from "./ai";
import { type AuthApiClientInterface } from "./auth/index";

export interface ApiClientInterface {
  auth: AuthApiClientInterface;
  ai: AiApiClientInterface;
}

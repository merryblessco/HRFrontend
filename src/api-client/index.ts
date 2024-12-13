import { type ApiClientInterface } from "../models/api-client/ApiClient.interface";

import apiLiveClient from "./live";

let env: string = "mock";

if (import.meta.env && import.meta.env.VITE_APP_API_CLIENT) {
  env = import.meta.env.VITE_APP_API_CLIENT.trim();
}

// return either the live or the mock client
let apiClient: ApiClientInterface;

if (env === "live") {
  apiClient = apiLiveClient;
}

export default apiClient!;

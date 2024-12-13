import { type ApiClientInterface } from "./../../models/api-client/ApiClient.interface";
import AiApiClient from "./ai";
import AuthApiClient from "./auth";

// create an instance of our main ApiClient that wraps the mock child clients
const apiLiveClient: ApiClientInterface = {
  auth: AuthApiClient,
  ai: AiApiClient,
};
// export our instance
export default apiLiveClient;

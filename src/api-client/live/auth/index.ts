import {
  type AuthApiClientUrlsInterface,
  type AuthApiClientInterface,
  AuthApiClientModel,
} from "./../../../models/api-client/auth";

const urls: AuthApiClientUrlsInterface = {
  authenticateUser: import.meta.env.VITE_APP_LUXEVILLE_BASE_URL + "auth/login",
  logout: import.meta.env.VITE_APP_LUXEVILLE_BASE_URL + "auth/logout",
};

// instantiate the AuthApiClient pointing at the url that returns static json mock \ data
const AuthApiClient: AuthApiClientInterface = new AuthApiClientModel(urls);
// export our instance
export default AuthApiClient;

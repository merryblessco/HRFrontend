import apiClient from "../api-client";
import {
  LoginRequest,
  LoginResponseData,
  LogoutRequest,
} from "../models/api-client/auth/Auth.Interface";

let timer: any;

export const authenticateUser = async (
  payload: LoginRequest
): Promise<LoginResponseData> => {
  return new Promise<LoginResponseData>((resolve, reject) => {
    apiClient.auth
      .authenticateUser(payload)
      .then((data) => {
        if (data) {
          const userData = {
            full_name: data.data.full_name,
            email: data.data.email,
            access_token: data.data.access_token,
            refresh_token: data.data.refresh_token,
          };

          const expiryDuration = "900";
          const expiresIn = parseInt(expiryDuration) * 1000;
          const expirationDate = new Date().getTime() + expiresIn;

          localStorage.setItem("fullname", userData.full_name! as string);

          localStorage.setItem("email", userData.email! as string);
          localStorage.setItem(
            "access_token",
            userData.access_token! as string
          );
          localStorage.setItem(
            "refresh_token",
            userData.refresh_token! as string
          );
          localStorage.setItem("token_expiration", expirationDate.toString());

          resolve(data.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const logout = async (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const refresh_token = localStorage.getItem("refresh_token");
    const payload: LogoutRequest = {
      refresh_token: refresh_token!,
    };
    apiClient.auth
      .logout(payload)
      .then((data) => {
        if (data) {
          resolve("Api Logout Success");
        }
      })
      .catch((err) => {
        reject("Api Logout Failed");
      })
      .finally(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("fullname");
        localStorage.removeItem("email");
      });
  });
};

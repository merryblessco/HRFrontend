import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import type { HttpRequestParamsInterface } from "./HttpRequestParams.interface";
import type { HttpClientInterface } from "./HttpClient.interface";
import { getSession } from "../../utils/sessionManager";
//import { useAuthStore } from "@/store/authstore/AuthStore";

export class HttpClientModel implements HttpClientInterface {
  private getToken(): string {
    const session = getSession();
    // const TOKEN_KEY =
    //   import.meta.env && import.meta.env.VITE_APP_API_CLIENT
    //     ? import.meta.env.VITE_APP_API_CLIENT
    //     : "myapp-token";
    //const token = localStorage.getItem(TOKEN_KEY) || "";
    // const authStore = useAuthStore();
    // const token = authStore.getFarmTinderAccessToken
    //   ? authStore.getFarmTinderAccessToken
    //   : localStorage.getItem("accessToken");

    return session.accessToken;
  }

  constructor() {}

  get<T>(parameters: HttpRequestParamsInterface): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, requiresToken, payload } = parameters;
      // axios options
      const options: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (requiresToken) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.getToken()}`;
      }

      axios
        .get(url, options)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((response: AxiosResponse) => {
          reject(response);
        });
    });
  }

  post<T>(parameters: HttpRequestParamsInterface): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, requiresToken, payload } = parameters;

      // axios options
      const options: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (requiresToken) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.getToken()}`;
      }

      var data = JSON.stringify({
        ...payload,
      });

      axios
        .post(url, data, options)
        .then((response: AxiosResponse) => {
          if (response.status === 500) {
            return;
          }

          resolve(response.data as T);
        })
        .catch((error: AxiosError) => {
          reject(error.response?.data);
        });
    });
  }

  patch<T>(parameters: HttpRequestParamsInterface): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, requiresToken, payload } = parameters;

      // axios options
      const options: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (requiresToken) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.getToken()}`;
      }

      var data = JSON.stringify({
        ...payload,
      });
      axios
        .patch(url, data, options)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((response: AxiosResponse) => {
          reject(response);
        });
    });
  }

  delete<T>(parameters: HttpRequestParamsInterface): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, requiresToken } = parameters;
      // axios options
      const options: AxiosRequestConfig = {
        headers: {},
      };

      if (requiresToken) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.getToken()}`;
      }

      axios
        .delete(url, options)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((response: AxiosResponse) => {
          reject(response);
        });
    });
  }
}

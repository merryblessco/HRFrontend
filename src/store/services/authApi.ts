import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addTokenToRequest } from "../../lib/token";
import { LoginRequest } from "../../types/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_HR_BASE_URL}`,
    prepareHeaders: (headers, { getState }: any) => {
      return addTokenToRequest(headers, { getState });
    },
  }),
  tagTypes: ["auth"],
  endpoints: (build) => ({
    login: build.mutation<any, LoginRequest>({
      query: (data) => ({
        url: `login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

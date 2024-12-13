import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addTokenToRequest } from "../../lib/token";
import { SetupModel, Summary } from "../../types/setup";
import { getSession } from "../../utils/sessionManager";

export const setupApi = createApi({
  reducerPath: "setupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_HR_BASE_URL}`,
    prepareHeaders: (headers, { getState }: any) => {
      const user = getSession();
      // Call your function to add the Bearer token to the headers
      const token = user.token; // Assuming token is stored in auth slice of state
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["setup"],
  endpoints: (build) => ({
    setup: build.mutation<any, SetupModel>({
      query: (data) => ({
        url: `setups/setup`,
        method: "POST",
        body: data,
      }),
    }),

    getDepartments: build.query({
      query: () => 'setups/departments',
    }),

    getSummary: build.query<Summary, any>({
      query: () => 'setups/summary',
    }),


  }),
});

export const { useSetupMutation, useGetDepartmentsQuery, useGetSummaryQuery } = setupApi;

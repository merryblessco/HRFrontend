import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "../../utils/sessionManager";
import { Employee, EmployeeDetails } from "../../types/Employee";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
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
  tagTypes: ["employee"],
  endpoints: (build) => ({
    createEmployee: build.mutation<any, Employee>({
      query: (data) => ({
        url: `employees/create-employee`,
        method: "POST",
        body: data,
      }),
    }),

    getEmployee: build.query<EmployeeDetails, any>({
      query: () => `employees/employee-info`,
    }),

    getEmployees: build.query<EmployeeDetails[], any>({
      query: () => `employees`,
    }),
  }),
});

export const { useCreateEmployeeMutation, useGetEmployeeQuery, useGetEmployeesQuery } = employeeApi;

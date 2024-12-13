import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addTokenToRequest } from "../../lib/token";
import { ApplicantInterview, Application, JobApplication, JobApplications, JobPosting, JobPostingDetails, SendInvitation } from "../../types/onboarding";
import { getSession } from "../../utils/sessionManager";

export const recruitmentApi = createApi({
    reducerPath: "recruitmentApi",
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
    tagTypes: ["recruitment"],
    endpoints: (build) => ({
        postJob: build.mutation<any, JobPostingDetails>({
            query: (data) => ({
                url: `Recruitment/PostJob`,
                method: "POST",
                body: data,
            }),
        }),
        allPostedJobs: build.mutation<JobPostingDetails[], any>({
            query: () => ({
                url: `Recruitment/getallJobs`,
                method: "GET",
            }),
        }),
        removeJob: build.mutation<any, any>({
            query: (id) => ({
                url: `Recruitment/${id}`,
                method: "DELETE",
            }),
        }),
        getJob: build.mutation<JobPostingDetails, any>({
            query: (id) => ({
                url: `Recruitment/getJob/${id}`,
                method: "Get",
            }),
        }),
        getApplications: build.mutation<Application, any>({
            query: () => ({
                url: `/Applicants`,
                method: "Get",
            }),
        }),
        getApplication: build.mutation<JobApplication, any>({
            query: (id) => ({
                url: `/Applicants/${id}`,
                method: "Get",
            }),
        }),
        getApplicationsByJobId: build.mutation<JobApplication[], any>({
            query: (id) => ({
                url: `/Applicants/get-all-applicants-by-job-id/${id}`,
                method: "Get",
            }),
        }),
        sendInvitation: build.mutation<any, SendInvitation>({
            query: (data) => ({
                url: `/Applicants/send-invite`,
                method: "Post",
                body: data,
            }),
        }),
        getInterviews: build.mutation<ApplicantInterview[], any>({
            query: (id) => ({
                url: `/Applicants/invitations?jobId=${id}`,
                method: "Get",
            }),
        }),
        getInterview: build.mutation<ApplicantInterview, SendInvitation>({
            query: (data) => ({
                url: `/Applicantsinvitation`,
                method: "Post",
                body: data,
            }),
        }),
        getJobs: build.query<JobPostingDetails[], any>({
            query: () => 'Recruitment/getallJobs',
        }),
    }),
});

export const {
    usePostJobMutation,
    useAllPostedJobsMutation,
    useRemoveJobMutation,
    useGetJobMutation,
    useGetApplicationsMutation,
    useGetApplicationMutation,
    useGetApplicationsByJobIdMutation,
    useSendInvitationMutation,
    useGetInterviewsMutation,
    useGetInterviewMutation,
    useGetJobsQuery } = recruitmentApi;

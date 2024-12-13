import axiosInstance from "../lib/axiosInterceptor";
import { Application } from "../types/onboarding";


export const submitApplication = async (
    payload: Application
): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        const formData = new FormData();
        formData.append("resume", payload.resume);
        formData.append("jobID", payload.jobID.toString());
        formData.append("firstName", payload.firstName);
        formData.append("lastName", payload.lastName);
        formData.append("fullName", payload.fullName);
        formData.append("email", payload.email);
        formData.append("dob", payload.dob);
        formData.append("phoneNumber", payload.phoneNumber);
        formData.append("coverLetter", payload.coverLetter);

        await axiosInstance
            .post(
                `Applicants`,
                formData
            )
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

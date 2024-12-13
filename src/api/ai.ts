import axios from "axios";
import apiClient from "../api-client";
import {
  AnalyzeResumeRequest,
  GenerateCoverLetterRequest,
} from "../models/api-client/ai/Ai.Interface";

export const analyzeResume = async (
  payload: AnalyzeResumeRequest
): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const formData = new FormData();
    if (payload.resume) {
      formData.append("resume", payload.resume);
    }
    for (let i = 0; i < payload.keywords.length; i++) {
      formData.append(`keywords[${i}]`, payload.keywords[i]);
    }

    axios
      .post(
        `${import.meta.env.VITE_APP_AI_SERVICE_URL}analyze-resume/`,
        formData
      )
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

// export const analyzeResume = async (
//   payload: AnalyzeResumeRequest
// ): Promise<any> => {
//   return new Promise<any>((resolve, reject) => {
//     const formData = new FormData();
//     if (payload.resume) {
//       formData.append("resume", payload.resume);
//     }
//     for (let i = 0; i < payload.keywords.length; i++) {
//       formData.append(`keywords[${i}]`, payload.keywords[i]);
//     }

//     apiClient.ai
//       .analyzeResume(payload)
//       .then((data) => {
//         if (data) {
//           resolve(data.data);
//         }
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

// export const generateCoverLetter = async (payload: GenerateCoverLetterRequest): Promise<string> => {
//   return new Promise<string>((resolve, reject) => {
//    const formData = new FormData();
//    if (payload.resume) {
//      formData.append("resume", payload.resume);
//    }
//     apiClient.
//       .logout(payload)
//       .then((data) => {
//         if (data) {
//           resolve("Api Logout Success");
//         }
//       })
//       .catch((err) => {
//         reject("Api Logout Failed");
//       })
//       .finally(() => {
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//         localStorage.removeItem("fullname");
//         localStorage.removeItem("email");
//       });
//   });
// };

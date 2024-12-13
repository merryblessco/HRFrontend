import axios from "axios";
import { CloudinaryUploadResponse } from "./types";

const presetKey = "ejr9m1q2";
const cloudName = "wallx-africa-limited";
export const uploadImage = async (
  file: any
): Promise<CloudinaryUploadResponse> => {
  return new Promise<CloudinaryUploadResponse>((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", presetKey);
    axios
      .post(
        `https://api.cloudinary.com/api/v1_1/${cloudName}/image/upload`,
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

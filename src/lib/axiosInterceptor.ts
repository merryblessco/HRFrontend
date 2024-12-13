import { getSession } from "../utils/sessionManager";
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_HR_BASE_URL, // Set your base URL from environment variables
});

// Add a request interceptor to include the Bearer token
axiosInstance.interceptors.request.use(
    (config) => {
        const user = getSession(); // Retrieve user session
        const token = user?.token; // Get the token from session

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);

export default axiosInstance;

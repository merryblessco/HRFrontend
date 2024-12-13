import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Navigate, replace, useNavigate } from "react-router-dom";
import { createSession, getSession } from "../../utils/sessionManager";
import { message, notification } from "antd";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "../../components/ui/Button";
import { Radio } from "antd";
import { ApplicationRoles, RoleToDashboardMap } from "../../enums/ApplicationRoles";

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginAsAdmin, setLoginAsAdmin] = useState(false);
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const baseUrl = `${import.meta.env.VITE_APP_HR_BASE_URL}`;
        const response = await axios.post(
          `${baseUrl}auth/login`,
          {
            ...values,
            isAdmin: loginAsAdmin,
          }
        );
        if (response.status === 200) {
          // Delay the session creation for 200ms after successful login

          setTimeout(async () => {
            const userDetails = {
              email: response?.data?.user.email,
              token: response?.data?.token,
              refreshToken: response?.data?.token,
              firstname: response?.data?.user.firstName,
              lastname: response?.data?.user.lastName,
              role: response?.data?.user.role,
              initialSetup: response?.data?.user.initialSetup,
              passwordChangedStatus: response?.data?.user.passwordChangedStatus,
              isOnboardingComplete: response?.data?.user.isOnboardingComplete,
            };

            // Create a session by encrypting and storing user details
            createSession(userDetails);

            setIsLoading(false);

            // Show success notification
            // notification.success({
            //   message: "Login Successful",
            //   description: "You have been successfully logged in.",
            // });
            message.success("Login successful");

            var user = await getSession();

            if (user && user.role) {
              // Cast user.role to ApplicationRoles to avoid implicit any
              const userRole = user.role as ApplicationRoles;

              const dashboardRoute = RoleToDashboardMap[userRole]; // This will now work

              if (dashboardRoute) {
                // Use replace method to avoid adding the route to history
                navigate(dashboardRoute, { replace: true });
              } else {
                // Handle cases where the role doesn't match any route
                navigate("/", { replace: true });
              }
            }

          }, 200); // 200ms delay
        }
      } catch (err) {
        setIsLoading(false);

        // Show error notification
        // notification.error({
        //   message: "Login Failed",
        //   description: "Invalid email or password.",
        // });
        message.error("Invalid email or password");
      }
    },
  });

  return (
    <>
      <div
        className="min-h-screen flex items-start justify-center rounded-[4px]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(54, 162, 235, 0.6) 1px, rgba(54, 162, 235, 0) 1px)`,
          backgroundSize: "20px 20px", // Adjust size of the pattern
        }}
      >
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mt-[6rem]">
          <h2 className="text-2xl font-bold mb-6 text-center text-primay-1">
            Sign in to your account
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primay-1"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="mb-6 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                {...formik.getFieldProps("password")}
                className="flex items-center w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primay-1"
              />
              <span
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="h-full absolute inset-y-0 right-0 flex items-center pr-3 mt-[5px] cursor-pointer"
              >
                {passwordVisible && (
                  <EyeSlashIcon className="text-gray-500 w-5 h-5" />
                )}
                {!passwordVisible && (
                  <EyeIcon className="text-gray-500 w-5 h-5" />
                )}
              </span>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="text-gray-700">
                Remember me
              </label>
            </div>
            {/* <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Login as
              </label>
              <Radio.Group
                onChange={(e) => setLoginAsAdmin(e.target.value)}
                value={loginAsAdmin}
              >
                <Radio value={false} className="mr-4">
                  Employee
                </Radio>
                <Radio value={true}>Admin</Radio>
              </Radio.Group>
            </div> */}
            <div className="mb-6 text-right">
              <a href="#" className="text-primay-1 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="w-full h-[38px]">
              <Button
                mode={"solid"}
                buttonText="Login"
                loading={isLoading}
                defaultColor="primary-1"
                hoverColor="primary-2"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

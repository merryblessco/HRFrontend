import React from 'react';
import { Navigate } from 'react-router-dom';
import { getSession } from '../utils/sessionManager'; // Utility function to get the user session
import { ApplicationRoles } from '../enums/ApplicationRoles'; // Enum for application roles

// Middleware for authentication and role-based access control
const AuthMiddleware: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = getSession(); // Retrieve the user session data (e.g., role, setup status)

  console.log(user);


  // Check if the user is authenticated
  // If no user session exists, redirect to the login page (commented out in the current state)
  // if (!user) {
  //   return <Navigate to="/auth/login" replace />;
  // }

  // Check if the user is an Administrator and hasn't completed the initial setup
  // If so, redirect to the setup page to complete setup before accessing other parts of the app
  if (user.role === ApplicationRoles.Administrator && !user.initialSetup) {
    return <Navigate to="/setup" replace />;
  }

  // If the user is an Employee, and hasn't changed their password, redirect them to the password change page
  // if (user.role === ApplicationRoles.Employee && !user.isOnboardinCompleted) {
  //   return <Navigate to="/auth/change-password" />;
  // }

  // If the user is an Employee, and hasn't completed the onboarding, redirect them to the Onboarding Page
  if (user.role === ApplicationRoles.Employee && !user.isOnboardinCompleted) {
    return <Navigate to="/employee/onboard" />;
  }

  // If the user is authenticated and the initial setup is done, render the child components (allow access)
  return children;
};

export default AuthMiddleware;

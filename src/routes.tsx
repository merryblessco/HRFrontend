import {
    createBrowserRouter,
    Navigate,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AdminLayout from "./pages/layouts/AdminLayout.tsx";
import EmployeeLayout from "./pages/layouts/EmployeeLayout.tsx";
import Login from "./pages/auth/Login.tsx";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard.tsx";
import EmployeeProfile from "./pages/Employee/EmployeeProfile.tsx";
import PayslipPage from "./pages/Employee/PayslipPage.tsx";
import LeaveRequestPage from "./pages/Employee/LeaveRequestPage.tsx";
import PerformanceReviewPage from "./pages/Employee/PerformanceReviewPage.tsx";
import DocumentManagementPage from "./pages/Employee/DocumentManagementPage.tsx";
import Dashboard from "./pages/Admin/Dashboard.tsx";
import Interviews from "./pages/Admin/onboarding/Interviews.tsx";
import WebsiteLayout from "./pages/layouts/WebsiteLayout.tsx";
import JobListings from "./pages/website/JobListings.tsx";
import JobDetails from "./pages/website/JobDetails.tsx";
import AuthMiddleware from "./hooks/AuthMiddleware.tsx";
import Setup from "./pages/Admin/Setup.tsx";
import { getSession } from "./utils/sessionManager.ts";
import EmployeeList from "./pages/Admin/employee/EmployeeList.tsx";
import OnboardingPage from "./pages/Employee/OnboardPage.tsx";
import { PathEnum } from "./enums/Common.ts";
import JobPosting from "./pages/Admin/onboarding/JobPosting.tsx";
import ResumeParsing from "./pages/Admin/onboarding/ResumeParsing.tsx";
import Applications from "./pages/Admin/onboarding/Applications.tsx";
import OnboardingWorkflow from "./pages/Admin/onboarding/OnboardingWorkflow.tsx";
import OnboardingProcess from "./pages/Admin/onboarding/OnboardingProcess.tsx";
import AddEmployee from "./pages/Admin/employee/AddEmployee.tsx";
import AddJobHistory from "./pages/Admin/employee/AddJobHistory.tsx";
import EmployeeDocumentManager from "./pages/Admin/employee/EmployeeDocumentManager.tsx";
import TimeTracking from "./pages/Admin/attendance/TimeTracking.tsx";
import LeaveManagement from "./pages/Admin/attendance/LeaveManagement.tsx";
import SalaryCalculations from "./pages/Admin/payroll/SalaryCalculations.tsx";
import OvertimeManagement from "./pages/Admin/attendance/OvertimeManagement.tsx";
import PayrollCompliance from "./pages/Admin/payroll/PayrollCompliance.tsx";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const session = getSession();
    return session ? children : <Navigate to={PathEnum.Auth.Login} />;
};

export const router = createBrowserRouter([

    // Website Section
    {
        element: <WebsiteLayout />,
        children: [
            {
                path: PathEnum.Auth.Login,
                element: <Login />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Website.Home,
                element: <JobListings />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Website.JobDetails(":id"),
                element: <JobDetails />,
                errorElement: <NotFoundPage />,
            },
        ],
    },

    // Admin Section
    {
        element: <AdminLayout />,
        children: [
            {
                path: PathEnum.Admin.Dashboard,
                element: (
                    <PrivateRoute>
                        <AuthMiddleware>
                            <Dashboard />
                        </AuthMiddleware>
                    </PrivateRoute>
                ),
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Admin.Setup,
                element: (
                    <PrivateRoute>
                        <Setup />
                    </PrivateRoute>
                ),
                errorElement: <NotFoundPage />,
            },

            // Onboarding Routes
            {
                path: PathEnum.Admin.Onboarding.JobPostings,
                element: (
                    <PrivateRoute>
                        <AuthMiddleware>
                            <JobPosting />
                        </AuthMiddleware>
                    </PrivateRoute>
                ),
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Admin.Onboarding.Applications,
                element: (
                    <PrivateRoute>
                        <AuthMiddleware>
                            <Applications />
                        </AuthMiddleware>
                    </PrivateRoute>
                ),
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Admin.Onboarding.ResumeParsing,
                element: <ResumeParsing />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Admin.Onboarding.OnboardingWorkflows,
                element: <OnboardingWorkflow />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Admin.Onboarding.Interviews,
                element: (
                    <PrivateRoute>
                        <AuthMiddleware>
                            <Interviews />
                        </AuthMiddleware>
                    </PrivateRoute>
                ),
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Admin.Onboarding.OnboardingProcess,
                element: <OnboardingProcess />,
                errorElement: <NotFoundPage />,
            },

            // Employee Management
            {
                path: PathEnum.Admin.Employees.List,
                element: <EmployeeList />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Admin.Employees.Add,
                element: <AddEmployee />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Admin.Employees.JobHistory,
                element: <AddJobHistory />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Admin.Employees.Documents,
                element: <EmployeeDocumentManager />,
                errorElement: <NotFoundPage />,
            },

            // Attendance Routes
            {
                path: PathEnum.Admin.Attendance.TimeTracking,
                element: <TimeTracking />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Admin.Attendance.AttendanceRecords,
                element: <TimeTracking />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Admin.Attendance.LeaveManagement,
                element: <LeaveManagement />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Admin.Attendance.OvertimeManagement,
                element: <OvertimeManagement />,
                errorElement: <NotFoundPage />,
            },

            // Payroll Routes
            {
                path: PathEnum.Admin.Payroll.SalaryCalculation,
                element: <SalaryCalculations />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Admin.Payroll.PayrollCompliance,
                element: <PayrollCompliance />,
                errorElement: <NotFoundPage />,
            },
        ],
    },

    // Employee Section
    {
        element: <EmployeeLayout />,
        children: [
            {
                path: PathEnum.Employee.Onboard,
                element: (
                    <PrivateRoute>
                        <OnboardingPage />
                    </PrivateRoute>
                ),
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Employee.Dashboard,
                element: (
                    <PrivateRoute>
                        <AuthMiddleware>
                            <EmployeeDashboard />
                        </AuthMiddleware>
                    </PrivateRoute>
                ),
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Employee.Profile,
                element: (
                    <PrivateRoute>
                        <AuthMiddleware>
                            <EmployeeProfile />
                        </AuthMiddleware>
                    </PrivateRoute>
                ),
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Employee.Payslips,
                element: <PayslipPage />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Employee.LeaveRequests,
                element: <LeaveRequestPage />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Employee.Performance,
                element: <PerformanceReviewPage />,
                errorElement: <NotFoundPage />,
            },
            {
                path: PathEnum.Employee.DocumentManagement,
                element: <DocumentManagementPage />,
                errorElement: <NotFoundPage />,
            },
        ],
    },

    // Catch-All NotFound Route
    {
        path: PathEnum.NotFound,
        element: <NotFoundPage />,
    },
]);

export const PathEnum = {
    Website: {
        Home: "/",
        JobDetails: (id: string | number) => `/job-listing/${id}`,
        Login: "/auth/login",
    },

    Admin: {
        Dashboard: "/dashboard",
        Setup: "/setup",

        // Employee Management
        Employees: {
            List: "/employees/all",
            Add: "/employees/add",
            JobHistory: "/employees/job-history",
            Documents: "/employees/documents",
        },

        // Onboarding
        Onboarding: {
            JobPostings: "/onboarding/job-postings",
            Applications: "/onboarding/applications",
            ResumeParsing: "/onboarding/resume-parsing",
            OnboardingWorkflows: "/onboarding/onboarding-workflows",
            Interviews: "/onboarding/interviews",
            OnboardingProcess: "/onboarding/onboarding-process",
        },

        // Attendance
        Attendance: {
            TimeTracking: "/attendance/time-tracking",
            AttendanceRecords: "/attendance/attendance-records",
            LeaveManagement: "/attendance/leave-management",
            OvertimeManagement: "/attendance/overtime-management",
        },

        // Payroll
        Payroll: {
            SalaryCalculation: "/payroll/salary-calculation",
            PayrollCompliance: "/payroll/payroll-compliance",
        },
    },

    Employee: {
        Onboard: "/employee/onboard",
        Dashboard: "/employee/dashboard",
        Profile: "/employee/profile",
        Payslips: "/employee/payslips",
        LeaveRequests: "/employee/leave-requests",
        Performance: "/employee/performance",
        DocumentManagement: "/employee/document-management",
    },

    Auth: {
        Login: "/auth/login",
    },

    NotFound: "*",
} as const;

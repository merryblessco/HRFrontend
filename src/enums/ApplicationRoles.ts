export enum ApplicationRoles {
    Administrator = "Administrator",  // Full system access, including managing users and permissions
    HrManager = "HrManager",          // Can manage employee records, handle recruitment, and oversee HR functions
    Recruiter = "Recruiter",          // Manages job postings, reviews applicants, and handles hiring
    Employee = "Employee",            // Standard employee role with access to personal data and leave requests
    PayrollManager = "PayrollManager", // Manages payroll data, salary information, and tax documents
    Manager = "Manager",              // Can oversee specific teams, approve leaves, and view team performance
    ItSupport = "ItSupport",          // Handles technical support, user access, and system maintenance
    Auditor = "Auditor",              // Has read-only access to audit data for compliance
    Trainer = "Trainer",              // Manages training materials, sessions, and employee learning progress
    Guest = "Guest"                   // Limited, temporary access for external consultants or auditors
}

export const RoleToDashboardMap: { [key in ApplicationRoles]: string } = {
    [ApplicationRoles.Administrator]: "/dashboard",
    [ApplicationRoles.HrManager]: "/hr/dashboard",
    [ApplicationRoles.Recruiter]: "/recruiter/dashboard",
    [ApplicationRoles.Employee]: "/employee/dashboard",
    [ApplicationRoles.PayrollManager]: "/payroll/dashboard",
    [ApplicationRoles.Manager]: "/manager/dashboard",
    [ApplicationRoles.ItSupport]: "/itsupport/dashboard",
    [ApplicationRoles.Auditor]: "/auditor/dashboard",
    [ApplicationRoles.Trainer]: "/trainer/dashboard",
    [ApplicationRoles.Guest]: "/guest/dashboard"
};
export interface Employee {
    firstName?: string;
    lastName: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    dob: string;
    address: string;
    state: string;
    lga: string;
    hireDate: string;
    passport: File | null;
    resume: File | null;
    managerId?: string;
}

export interface EmployeeDetails {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string | null;
    employeeNumber?: string | null;
    address?: string;
    stateCode?: string | null;
    lgaId?: string;
    state?: string | null;
    lga?: string | null;
    dob?: string;
    passportBytes?: string | null;
    resumeBytes?: string | null;
    passport?: string | null;
    resume?: string | null;
    jobTitle?: string;
    departmentId?: string;
    department?: string;
    positionId?: string;
    position?: string | null;
    hireDate?: string;
    managerId?: string | null;
    managerName?: string | null;
    role?: string | null;
    status?: string | null;
    statusName?: string | null;
}

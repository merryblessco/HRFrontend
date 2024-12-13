export interface Department {
    id?: number;
    name: string;
    description?: string;
}

export interface Tax {
    taxName: string;
    taxPercentage: number;
}

export interface SetupModel {
    departments: Department[];
    taxes: Tax[];
    defaultCurrency: string;
    workweekDays: string;
}

export interface Summary {
    departmentCount: number;
    employeeCount: number;
    totalExpense: number;
}

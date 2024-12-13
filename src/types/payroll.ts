export interface SalaryRecord {
  id: number;
  employeeId: string;
  employeeName: string;
  baseSalary: number;
  effectiveDate: string;
  adjustmentType: "Increment" | "Decrement" | "Bonus" | "Initial";
  adjustmentAmount: number;
  reason: string;
}

export interface ComplianceItem {
  id?: number;
  regulationType?: string;
  description?: string;
  dueDate?: string;
  status?: "Completed" | "Pending" | "Overdue";
  responsiblePerson?: string;
  notes?: string;
}

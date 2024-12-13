export interface TimeEntry {
  id: number;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  project: string;
  description: string;
  isAutomated: boolean;
}

export interface LeaveRequest {
  id: number;
  employeeId: string;
  employeeName: string;
  leaveType: "Vacation" | "Sick Leave" | "Personal" | "Other";
  startDate: string;
  endDate: string;
  status: "Pending" | "Approved" | "Rejected";
  reason: string;
}

export interface LeaveBalance {
  vacation: number;
  sickLeave: number;
  personal: number;
}

export interface OvertimeRequest {
  id: number;
  employeeId: string;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

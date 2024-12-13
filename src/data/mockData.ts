export const dashboardData = {
  employeeCount: 150,
  departmentCount: 8,
  totalExpenses: 1500000,
  employees: [
    { id: 1, name: 'John Doe', department: 'IT' },
    { id: 2, name: 'Jane Smith', department: 'HR' },
    { id: 3, name: 'Mike Johnson', department: 'Finance' },
    { id: 4, name: 'Emily Brown', department: 'Marketing' },
    { id: 5, name: 'David Lee', department: 'Operations' },
  ],
  notifications: [
    { id: 1, message: 'New employee onboarding today' },
    { id: 2, message: 'Performance review deadline approaching' },
  ],
  chatAlerts: 2,
  departmentEmployees: {
    'IT': 40,
    'HR': 15,
    'Finance': 25,
    'Marketing': 30,
    'Operations': 40
  }
};

export const employeeData = [
  { id: 1, name: 'John Doe', position: 'Software Developer', department: 'IT', email: 'john.doe@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', position: 'HR Manager', department: 'HR', email: 'jane.smith@example.com', phone: '234-567-8901' },
  // ... add more employee data as needed
];

export const chartData = {
  labels: Object.keys(dashboardData.departmentEmployees),
  datasets: [
    {
      data: Object.values(dashboardData.departmentEmployees),
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Department Distribution',
    },
  },
};


export const employeesData = {
  name: "John Doe",
  position: "Software Developer",
  department: "IT",
  attendance: 95,
  leaveBalance: 12,
  upcomingReviews: 2,
  completedTrainings: 3,
};

export const employeesprofileData = {
  name: "John Doe",
  position: "Senior Developer",
  department: "Engineering",
  email: "john.doe@example.com",
  phone: "+1 234 567 890",
  dob: "1990-05-15",
  joiningDate: "2015-09-01",
  employeeID: "EMP123456",
  manager: "Jane Smith",
  location: "New York Office",
  employmentType: "Full-time",
  shift: "Day",
  attendance: 98,
  leaveBalance: 12,
  completedTrainings: 8,
  performanceScore: 95,
  skills: ["JavaScript", "React", "Node.js", "TypeScript"],
  certifications: "Certified React Developer",
  awards: "Employee of the Month (June 2023)",
  notes: "John has consistently exceeded expectations in his role as Senior Developer."
};

export const payslipsData = [
  {
    month: "August",
    year: 2023,
    grossSalary: 5000,
    deductions: 500,
    netSalary: 4500,
    paidOn: "2023-08-31",
    bankAccount: "Bank of America - ****5678",
    paymentMethod: "Direct Deposit",
    bonus: 200,
    tax: 300,
  },
  {
    month: "July",
    year: 2023,
    grossSalary: 4800,
    deductions: 400,
    netSalary: 4400,
    paidOn: "2023-07-31",
    bankAccount: "Bank of America - ****5678",
    paymentMethod: "Direct Deposit",
  },
  {
    month: "June",
    year: 2023,
    grossSalary: 4900,
    deductions: 450,
    netSalary: 4450,
    paidOn: "2023-06-30",
    bankAccount: "Bank of America - ****5678",
    paymentMethod: "Direct Deposit",
    tax: 350,
  },
];

export const leaveHistoryData = [
  {
    leaveType: "Sick Leave",
    startDate: "2023-08-15",
    endDate: "2023-08-18",
    status: "Approved",
    reason: "Flu",
    appliedOn: "2023-08-10",
    approvalDate: "2023-08-12",
  },
  {
    leaveType: "Casual Leave",
    startDate: "2023-07-10",
    endDate: "2023-07-12",
    status: "Rejected",
    reason: "Family event",
    appliedOn: "2023-07-05",
  },
  {
    leaveType: "Annual Leave",
    startDate: "2023-06-01",
    endDate: "2023-06-15",
    status: "Approved",
    reason: "Vacation",
    appliedOn: "2023-05-15",
    approvalDate: "2023-05-20",
  },
];


export const performanceReviewsData = [
  {
    reviewPeriod: "Q1 2023",
    reviewDate: "2023-04-15",
    rating: 85,
    managerFeedback: "Great job meeting your goals this quarter. Your contributions were highly valuable, and your problem-solving skills stood out.",
    peerFeedback: "John was a great team player and always ready to help out when needed.",
    goalsAchieved: ["Completed project A", "Increased sales by 10%", "Improved client satisfaction by 15%"],
    areasForImprovement: "Consider enhancing your communication skills to manage cross-functional team expectations better.",
  },
  {
    reviewPeriod: "Q4 2022",
    reviewDate: "2023-01-10",
    rating: 75,
    managerFeedback: "You had a solid quarter, but there were areas where improvements can be made, particularly in time management.",
    goalsAchieved: ["Reduced operational costs by 8%", "Mentored two junior employees"],
    areasForImprovement: "Work on meeting deadlines more consistently and focus on mentoring junior team members.",
  },
  {
    reviewPeriod: "Mid-Year 2022",
    reviewDate: "2022-07-15",
    rating: 90,
    managerFeedback: "Outstanding performance across all your tasks. Keep up the great work!",
    peerFeedback: "John's leadership skills are exceptional. He always ensures the team stays focused and aligned.",
    goalsAchieved: ["Launched new product line", "Exceeded revenue target by 20%"],
    areasForImprovement: "None, continue the excellent work.",
  },
];

export const documentData = [
  {
    name: "Employment Contract",
    type: "Contract",
    uploadDate: "2023-01-15",
    description: "John Doe's employment contract signed on 15th January 2023.",
  },
  {
    name: "Health Insurance Certificate",
    type: "Certificate",
    uploadDate: "2023-02-10",
    description: "Health insurance document for the year 2023.",
  },
  {
    name: "Tax Forms",
    type: "Tax Document",
    uploadDate: "2023-04-01",
    description: "W2 form for 2022 tax filing.",
  },
  {
    name: "Performance Review Q1",
    type: "Review",
    uploadDate: "2023-05-10",
    description: "Quarter 1 performance review for John Doe.",
  },
];



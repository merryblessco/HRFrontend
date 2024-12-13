import React, { useState } from "react";
import PageTitle from "../../../components/ui/PageTitle";
import DocumentViewer from "../../../components/DocumentViewer";
import EmployeeSelector from "../../../components/EmployeeSelector ";
import DepartmentSelector from "../../../components/DepartmentSelector";

const EmployeeDocumentManager: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>("All Departments");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      <PageTitle title="Employee Document Manager" />

      <div className="flex mt-6">
        <div className="w-1/3 pr-4">
          <DepartmentSelector
            selectedDepartment={selectedDepartment}
            onSelectDepartment={setSelectedDepartment}
          />
          <div className="mt-4">
            <EmployeeSelector
              selectedDepartment={selectedDepartment}
              onSelectEmployee={setSelectedEmployee}
            />
          </div>
        </div>
        <div className="w-2/3 pl-4">
          {selectedEmployee ? (
            <DocumentViewer employeeId={selectedEmployee} />
          ) : (
            <p className="text-gray-500">
              Select an employee to view their documents
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDocumentManager;

import React, { useEffect, useState } from "react";
import { Card, List, Tag, Spin, Alert, Skeleton } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import PageTitle from "../../components/ui/PageTitle";
import { useGetEmployeeQuery } from "../../store/services/employeeApi";
import { employeesprofileData } from "../../data/mockData";
import { formatDateTime, formatStringToDate } from "../../utils/helperMethods";

const EmployeeProfile: React.FC = () => {
  const { data: employeeData, error, isLoading } = useGetEmployeeQuery(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Delay for 2 seconds before switching the loading state to false
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer); // Cleanup the timeout on component unmount
    }
  }, [isLoading]);

  // Check for error state
  if (error) {
    return <Alert message="Error fetching employee data" type="error" />;
  }

  return (
    <div className="flex flex-col">
      <PageTitle title="Employee Profile" />
      <div className="pt-10 p-6 space-y-6">
        {/* Flex container for two cards in a row */}
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Personal Information Card */}
          <Card title="Personal Information" bordered={true} className="mb-4 md:w-1/2">
            <div className="space-y-2">
              {loading ? (
                <Skeleton active />
              ) : (
                <>
                  <p><strong>Name:</strong> {employeeData!.firstName} {employeeData!.lastName}</p>
                  <p><strong>Position:</strong> {employeeData!.position}</p>
                  <p><strong>Department:</strong> {employeeData!.department}</p>
                  <p><strong>Email:</strong> <MailOutlined /> {employeeData!.email}</p>
                  <p><strong>Phone:</strong> <PhoneOutlined /> {employeeData!.phoneNumber}</p>
                  <p><strong>Address:</strong> {employeeData!.address}</p>
                  <p><strong>Date of Birth:</strong> {formatStringToDate(employeeData!.dob!)}</p>
                  <p><strong>Date of Joining:</strong> {formatStringToDate(employeeData!.hireDate!)}</p>
                  <p><strong>Employee ID:</strong> {employeeData!.employeeNumber}</p>
                </>
              )}
            </div>
          </Card>

          {/* Employment Details */}
          <Card title="Employment Details" bordered={true} className="mb-4 md:w-1/2">
            <div className="space-y-2">
              {loading ? (
                <Skeleton active />
              ) : (
                <>
                  <p><strong>Position:</strong> {employeeData!.position}</p>
                  <p><strong>Department:</strong> {employeeData!.department}</p>
                  <p><strong>Manager:</strong> {employeeData!.managerName ? employeeData!.managerName : "--"}</p>
                  <p><strong>Employment Type:</strong> {"Full-Time"}</p>
                  <p><strong>Shift:</strong> --</p>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Flex container for Skills and Additional Notes */}
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Skills and Achievements */}
          <Card title="Skills & Achievements" bordered={true} className="mb-4 md:w-1/2">
            <div className="space-y-2">
              {loading ? (
                <Skeleton active paragraph={{ rows: 3 }} />
              ) : (
                <>
                  <p><strong>Skills:</strong></p>
                  <List
                    dataSource={employeesprofileData.skills}
                    renderItem={(skill) => (
                      <Tag color="blue" key={skill}>{skill}</Tag>
                    )}
                  />
                </>
              )}
            </div>
          </Card>

          {/* Additional Notes */}
          <Card title="Additional Notes" bordered={true} className="mb-4 md:w-1/2">
            {loading ? (
              <Skeleton active paragraph={{ rows: 2 }} />
            ) : (
              <p>No notes yet</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;

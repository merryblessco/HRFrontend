import React, { useState, useEffect } from "react";
import { AppstoreAddOutlined, TeamOutlined, CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, Spin, Alert, Skeleton } from "antd";
import DashboardCard from "../../components/cards/DashboardCard";
import PageTitle from "../../components/ui/PageTitle";
import { useGetEmployeeQuery } from "../../store/services/employeeApi";
import TaskDistribution from "../../components/charts/TaskDistribution";
import EmployeeMetrics from "../../components/charts/EmployeeMetrics";

const EmployeeDashboard: React.FC = () => {
  // Use the query API to fetch employee data
  const { data: employeeData, error: employeeError, isLoading: isEmployeeLoading } = useGetEmployeeQuery(undefined);

  // States for simulated data and loading for the dashboard cards
  const [attendanceRate, setAttendanceRate] = useState<number | null>(null);
  const [leaveBalance, setLeaveBalance] = useState<number | null>(null);
  const [upcomingReviews, setUpcomingReviews] = useState<number | null>(null);
  const [completedTrainings, setCompletedTrainings] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Introduce a 2-second delay for skeleton loading and simulate API data for dashboard cards
  useEffect(() => {
    const timer = setTimeout(() => {
      setAttendanceRate(0); // Simulated data
      setLeaveBalance(0); // Simulated data
      setUpcomingReviews(0); // Simulated data
      setCompletedTrainings(0); // Simulated data
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col">
      <PageTitle title="Employee Dashboard" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        {/* Simulated Dashboard Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
          {/* Attendance Rate */}
          <Card bordered={true}>
            {loading ? (
              <Skeleton active />
            ) : (
              <DashboardCard
                count={`${attendanceRate}%`}
                title="Attendance Rate"
                icon={TeamOutlined}
                color="#B7EB8F"
                isMoney={false}
              />
            )}
          </Card>

          {/* Leave Balance */}
          <Card bordered={true}>
            {loading ? (
              <Skeleton active />
            ) : (
              <DashboardCard
                count={leaveBalance}
                title="Leave Balance"
                icon={CalendarOutlined}
                color="#FFC106"
                isMoney={false}
              />
            )}
          </Card>

          {/* Upcoming Reviews */}
          <Card bordered={true}>
            {loading ? (
              <Skeleton active />
            ) : (
              <DashboardCard
                count={upcomingReviews}
                title="Upcoming Reviews"
                icon={ClockCircleOutlined}
                color="#36A2EB"
                isMoney={false}
              />
            )}
          </Card>

          {/* Completed Trainings */}
          <Card bordered={true}>
            {loading ? (
              <Skeleton active />
            ) : (
              <DashboardCard
                count={completedTrainings}
                title="Completed Trainings"
                icon={AppstoreAddOutlined}
                color="#FF6384"
                isMoney={false}
              />
            )}
          </Card>
        </div>

        {/* Personal Information Card */}
        <Card title="Personal Information" bordered={true} className="mb-4">
          {isEmployeeLoading || loading ? (
            <Skeleton active />
          ) : employeeError ? (
            <Alert message="Failed to load employee data." type="error" />
          ) : (
            <div className="space-y-2">
              <p><strong>Name:</strong> {`${employeeData?.firstName + " " + employeeData?.lastName}` || "N/A"}</p>
              <p><strong>Position:</strong> {employeeData?.position || "N/A"}</p>
              <p><strong>Department:</strong> {employeeData?.department || "N/A"}</p>
            </div>
          )}
        </Card>

        {/* Charts Section */}
        {!isEmployeeLoading && !loading && (<div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
          <TaskDistribution />
          <EmployeeMetrics />
        </div>)}
      </div>
    </div>
  );
};

export default EmployeeDashboard;

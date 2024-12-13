import React, { useEffect, useState } from "react";
import { AppstoreAddOutlined, TeamOutlined } from "@ant-design/icons";
import { SiExpensify } from "react-icons/si";
import DashboardCard from "../../components/cards/DashboardCard";
import DepartmentDistribution from "../../components/charts/DepartmentDistribution";
import AdminMetrics from "../../components/charts/AdminMetrics";
import PageTitle from "../../components/ui/PageTitle";
import { toast } from "sonner";
import { Skeleton } from "antd"; // Import Ant Design Skeleton
import { useGetSummaryQuery } from "../../store/services/setupApi";

const Dashboard: React.FC = () => {
  // State to manage skeleton loading
  const [loading, setLoading] = useState(true);

  // Fetch the summary data using the RTK query hook
  const { data: summary, error, isLoading } = useGetSummaryQuery(undefined);

  useEffect(() => {
    // Simulate a 2-second delay to show skeleton
    setTimeout(() => setLoading(false), 2000);

    if (error) {
      toast.error("Failed to load summary data.");
    }
  }, [error]);

  return (
    <div className="flex flex-col">
      <PageTitle title="Dashboard" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        {/* Skeleton Wrapper */}
        <Skeleton active loading={loading}>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-4">
            <DashboardCard
              count={isLoading ? 0 : summary?.employeeCount || 0}
              title="Total Employees"
              icon={TeamOutlined}
              color="#B7EB8F"
              isMoney={false}
            />
            <DashboardCard
              count={isLoading ? 0 : summary?.departmentCount || 0}
              title="Total Departments"
              icon={AppstoreAddOutlined}
              color="#FFC106"
              isMoney={false}
            />
            <DashboardCard
              count={isLoading ? 0 : summary?.totalExpense || 0}
              title="Total Expenses"
              icon={SiExpensify}
              color="#36A2EB"
              isMoney={true}
            />
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
            <DepartmentDistribution />
            <AdminMetrics />
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default Dashboard;

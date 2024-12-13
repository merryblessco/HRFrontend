import { Layout, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSession } from "../../utils/sessionManager";
import { ApplicationRoles } from "../../enums/ApplicationRoles";

const { Header, Content } = Layout;

export default function WebsiteLayout() {
  const session = getSession();
  const [userDetails, setUserDetails] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      setUserDetails(session);
    }
  }, [navigate]);

  const handleDashboardNavigation = () => {
    if (userDetails?.role === ApplicationRoles.Administrator) {
      navigate("/dashboard");
    } else if (userDetails?.role === ApplicationRoles.Employee) {
      navigate("/employee/dashboard");
    }
  };

  return (
    <Layout>
      <Header
        className="header sticky"
        style={{
          backgroundColor: "#36A2EB",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          onClick={() => navigate("/")}
          className="logo"
          style={{ color: "white", cursor: "pointer" }}
        >
          <h1 className="text-xl font-semibold" style={{ margin: 0 }}>
            HR Management
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {!userDetails ? (
            <Button
              onClick={() => navigate("/auth/login")}
              type="primary"
              style={{ backgroundColor: "#fff", color: "#36A2EB", borderColor: "#fff" }}
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={handleDashboardNavigation}
              type="primary"
              style={{ backgroundColor: "#fff", color: "#36A2EB", borderColor: "#fff" }}
            >
              Dashboard
            </Button>
          )}
        </div>
      </Header>

      <Content style={{ padding: "20px" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-6 ">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

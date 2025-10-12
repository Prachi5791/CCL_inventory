import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { sidebarItems } from "../../constant/sidebarItems";
import { useAppDispatch } from "../../redux/hooks";
import { logoutUser } from "../../redux/services/authSlice";

const { Content, Sider } = Layout;

const Sidebar = () => {
  const [showLogoutBtn, setShowLogoutBtn] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          if (type === "responsive") {
            setShowLogoutBtn(!collapsed);
          }
          if (type === "clickTrigger") {
            setShowLogoutBtn(!collapsed);
          }
        }}
        width="240px"
        style={{
          backgroundColor: "#1f2937",
          position: "relative",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="demo-logo-vertical">
          <h1
            style={{
              color: "#ffffff",
              padding: "1.5rem 1rem",
              fontSize: "1.5rem",
              textAlign: "center",
              fontWeight: "700",
              letterSpacing: "1px",
              margin: 0,
              borderBottom: "1px solid #374151",
            }}
          >
            INVENTORY
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{
            backgroundColor: "#1f2937",
            fontWeight: "500",
            border: "none",
          }}
          defaultSelectedKeys={["Dashboard"]}
          items={sidebarItems}
        />
        {showLogoutBtn && (
          <div
            style={{
              margin: "auto",
              position: "absolute",
              bottom: 0,
              padding: "1rem",
              display: "flex",
              width: "100%",
              justifyContent: "center",
              borderTop: "1px solid #374151",
              backgroundColor: "#1f2937",
            }}
          >
            <Button
              type="primary"
              danger
              style={{
                width: "100%",
                fontWeight: "600",
                textTransform: "uppercase",
                height: "40px",
                borderRadius: "6px",
              }}
              onClick={handleClick}
            >
              <LogoutOutlined />
              Logout
            </Button>
          </div>
        )}
      </Sider>
      <Layout>
        <Content
          style={{
            padding: "2rem",
            background: "#f3f4f6",
          }}
        >
          <div
            style={{
              padding: "1.5rem",
              maxHeight: "calc(100vh - 4rem)",
              minHeight: "calc(100vh - 4rem)",
              background: "#ffffff",
              borderRadius: "8px",
              overflow: "auto",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;

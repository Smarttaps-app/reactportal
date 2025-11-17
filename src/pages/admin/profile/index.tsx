import { Layout, Flex, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { Castle, ShieldCheck, User2Icon } from "lucide-react";
const { Content } = Layout;

export default function ProfileIndex() {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  return (
    <Flex>
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        items={[
          {
            key: "1",
            icon: <User2Icon />,
            label: <Link to={``}>Profile</Link>,
          },
          {
            key: "2",
            icon: <ShieldCheck />,
            label: <Link to={`change-password`}>Change Password</Link>,
          },
          {
            key: "3",
            icon: <Castle />,
            label: <Link to={`cash-out-account`}>Enable Cash Out</Link>,
          },
        ]}
      />
      <Content
        style={{
          margin: "12px 8px",
          padding: 12,
          minHeight: window.screen.height - 100,
          borderRadius: borderRadiusLG,
          overflow: "initial",
        }}
      >
        <Outlet />
      </Content>
    </Flex>
  );
}

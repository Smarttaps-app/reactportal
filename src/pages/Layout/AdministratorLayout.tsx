import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import profile from "../../assets/avatar.png";
import logo from "../../assets/logo.png";
import {
  Avatar,
  Button,
  Flex,
  Layout,
  Space,
  Spin,
  Tag,
  theme,
  Tooltip,
  Typography,
} from "antd";

import {
  CommentOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Grid } from "antd";
import { useUser } from "../../context/useUser";
import SidebarMenu from "./SidebarMenu";
import { Common } from "../../utils/Common";
const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;
// image

const AdministratorLayout: React.FC = () => {
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const sidebarWidth = collapsed ? 80 : screens.lg ? 240 : 160;
  const { user, loading: isPending, logout } = useUser();
  useEffect(() => {
    // setCollapsed(!screens.md);
  }, [screens.md]);

  if (isPending) return <Spin />;
  if (!user) return null;
  return (
    <Layout hasSider style={{ height: "100vh" }}>
      <Sider
        width={sidebarWidth}
        collapsible
        collapsed={collapsed}
        trigger={null}
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          overflow: "auto",
        }}
      >
        <Link className="" to="/">
          <img className="h-16 mx-auto" src={logo} />
        </Link>
        <Typography.Text className="!text-white mx-auto w-full justify-center">
          {user?.firstname} {user?.lastname}
        </Typography.Text>
        <SidebarMenu user={user} />
      </Sider>
      <Layout style={{ marginInlineStart: sidebarWidth }}>
        <Header
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: sidebarWidth,
            height: 64,
            padding: 0,
            zIndex: 100,
            background: colorBgContainer,
          }}
        >
          <Flex justify="space-between">
            <Button
              type="text"
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", width: 64, height: 64 }}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />

            <Space size="large" className="mr-4">
              <Tag color="green">
                {Common.formatAsCurrency(
                  Number(user.wallet?.availableBalance ?? 0),
                )}
              </Tag>
              <CommentOutlined />
              <Link to="profile">
                <Avatar src={profile} />
              </Link>
              <Tooltip title="Logout">
                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  onClick={logout}
                  danger
                />
              </Tooltip>
            </Space>
          </Flex>
        </Header>
        <Content
          style={{
            margin: "62px 12px",
            padding: 12,
            overflow: "initial",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdministratorLayout;

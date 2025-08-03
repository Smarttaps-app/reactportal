import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import profile from "../../assets/avatar.png";
import logo from "../../assets/logo.png";
import {
  Avatar,
  Button,
  ConfigProvider,
  Flex,
  Layout,
  Menu,
  Space,
  Spin,
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
import type { GetProp, MenuProps } from "antd";
import { Grid } from "antd";
import { useUser } from "../../context/useUser";
import { protectedRoutes } from "../../routes/routes";
const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;
// image
type MenuItem = GetProp<MenuProps, "items">[number];
const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  //background: "linear-gradient(#F29E0B,#c89720, #F29E0B)",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};
const AdministratorLayout: React.FC = () => {
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const sidebarWidth = collapsed ? 80 : screens.lg ? 240 : 160;
  const { user, loading: isPending, logout } = useUser();
  useEffect(() => {
    if (!screens.md) setCollapsed(true);
  }, [screens]);

  if (isPending) return <Spin />;
  const items: MenuItem[] = protectedRoutes
    .filter((route) => route.title)
    .map((route, index) => {
      if (route.children && route.children.length > 0) {
        const visibleChildren = route.children?.filter(
          (child) => child.showInMenu
        );
        if (visibleChildren?.length > 0) {
          return {
            key: String(index + 1),
            label: route.title,
            icon: route.icon,
            children: visibleChildren.map((child, cIndex) => ({
              key: `${index + 1}-${cIndex + 1}`,
              label: (
                <Link to={`/admin/${route.path}/${child.path}`}>
                  {child.path.charAt(0).toUpperCase() +
                    child.path.replace("-", " ").slice(1)}
                </Link>
              ),
            })),
          };
        } else {
          return {
            key: String(index + 1),
            label: <Link to={`/admin/${route.path}`}>{route.title}</Link>,
            icon: route.icon,
          };
        }
      } else {
        return {
          key: String(index + 1),
          label: <Link to={`/admin/${route.path}`}>{route.title}</Link>,
          icon: route.icon,
        };
      }
    });
  return (
    <Layout hasSider>
      <ConfigProvider
        theme={{
          token: {
            //colorPrimary: "#F29E0B",
            //colorBgContainer: "#00000000",
            //colorBgTextActive: "#ffffff",
          },
          components: {
            Table: {
              fontSize: 10,
              cellFontSize: 10,
              cellFontSizeMD: 10,
              cellFontSizeSM: 10,
            },
            Menu: {},
          },
        }}
      >
        <Sider
          width={sidebarWidth}
          style={siderStyle}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Link className="" to="/">
            <img className="h-16 mx-auto" src={logo} />
          </Link>
          <Typography.Text className="!text-white mx-auto">
            {user?.firstname} {user?.lastname}
          </Typography.Text>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
            theme="dark"
          />
        </Sider>
      </ConfigProvider>
      <Layout style={{ marginInlineStart: sidebarWidth }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex justify="space-between">
            <Button
              type="text"
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", width: 64, height: 64 }}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />

            <Space className="pe-2">
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
            margin: "12px 8px",
            padding: 24,
            minHeight: window.screen.height - 100,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
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

import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
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
  Typography,
} from "antd";

import {
  CommentOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import type { GetProp, MenuProps } from "antd";
import { useUser } from "../../context/useUser";
import { protectedRoutes } from "../../routes/routes";
const { Header, Sider, Content } = Layout;
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
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user, loading: isPending, logout } = useUser();
  console.log(user);
  //const d = new Date();
  if (isPending) return <Spin />;
  /* const items: MenuItem[] = protectedRoutes
    .filter((route) => route.title)
    .map((route, index) => ({
      key: String(index + 1),
      label: <Link to={`/admin/${route.path}`}>{route.title}</Link>,
      icon: route.icon,
    }));*/
  const items: MenuItem[] = protectedRoutes
    .filter((route) => route.title)
    .map((route, index) => {
      if (route.children && route.children.length > 0) {
        // Has nested routes – create submenu
        return {
          key: String(index + 1),
          label: route.title,
          icon: route.icon,
          children: route.children.map((child, cIndex) => ({
            key: `${index + 1}-${cIndex + 1}`,
            label: (
              <Link to={`/admin/${route.path}/${child.path}`}>
                {child.path.charAt(0).toUpperCase() + child.path.slice(1)}
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
          width={collapsed ? 80 : window.screen.width * 0.17}
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
      <Layout
        style={{
          marginInlineStart: collapsed ? 80 : window.screen.width * 0.17,
        }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex justify="space-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            <Space className="pe-2">
              <CommentOutlined />
              <Link to="profile">
                <Avatar src={profile} />
              </Link>
              <LogoutOutlined onClick={logout} />
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

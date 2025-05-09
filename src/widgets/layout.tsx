import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  DatabaseOutlined,
  HomeOutlined,
  InfoCircleTwoTone,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  SettingOutlined,
  TagsOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import logo from "./../assets/logo.png";
const { Header, Content, Footer, Sider } = Layout;

const Menus = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <Layout hasSider>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical self-center">
          <img src={logo} className="mx-auto" alt="brand " />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "dashboard",
              icon: <HomeOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "players",
              icon: <UsergroupAddOutlined />,
              label: <Link to="/players">Players</Link>,
            },
            {
              key: "subscriptions",
              icon: <DatabaseOutlined />,
              label: <Link to="/subscriptions">Subscriptions</Link>,
            },
            {
              key: "games",
              icon: <TagsOutlined />,
              label: <Link to="/games">Games</Link>,
            },
            {
              key: "rules",
              icon: <SettingOutlined />,
              label: <Link to="/rules">Rules</Link>,
            },
            {
              key: "instruction",
              icon: <InfoCircleTwoTone />,
              label: <Link to="/instructions">Instructions</Link>,
            },
            /*{
              key: "settings",
              icon: <SettingOutlined />,
              label: <Link to="/settings">Settings</Link>,
            },*/
            {
              key: "profile",
              icon: <ProfileOutlined />,
              label: <Link to="/profile">Profile</Link>,
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: <h6 onClick={handleLogOut}>Log out</h6>,
            },
          ]}
        />
      </Sider>
      <Layout
        className={`${collapsed ? "min-h-screen" : "min-h-screen ml-52"}`}
      >
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="size-16 text-base"
          />
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              //background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />

            {/*
              // indicates very long content
              Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? "more" : "..."}
                  <br />
                </React.Fragment>
              ))*/}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {import.meta.env.VITE_APP_NAME} ©{new Date().getFullYear()} Created by
          Altswitch Technology Limited
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Menus;

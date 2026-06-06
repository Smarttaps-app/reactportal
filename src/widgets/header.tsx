import { Flex, Layout, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";


const { Header: AntHeader } = Layout;

export default function Header() {
  return (
    <AntHeader
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <img className="h-12" src={logo} alt="logo" />
      </Link>
      <Flex flex={1} justify="flex-end">
        <Menu theme="dark" mode="horizontal" style={{ minWidth: 0 }}>
          <Menu.Item key="home">
            <Typography.Link href="#" className="!text-white">Home</Typography.Link>
          </Menu.Item>
          <Menu.Item key="login">
            <Link to="/auth/login" className="!text-white">Login</Link>
          </Menu.Item>
        </Menu>
      </Flex>
    </AntHeader>
  );
}

import { Link, Outlet, useLocation } from "react-router-dom";
import { Card, ConfigProvider, Flex, Row } from "antd";
import g2 from "../../assets/logo.png";

function AuthenticationLayout() {
  const location = useLocation();
  const from = location.pathname || "login";
  console.log(from);
  return (
    <ConfigProvider
      theme={{
        token: {
          //colorPrimary: "#F29E0B",
          //colorBgContainer: "#00000000",
          //colorBgTextActive: "#ffffff",
        },
      }}
    >
      <Row
        className="bg-gradient-to-r from-[#ff9900] to-[#cc5500] h-screen"
        justify="space-around"
        align="middle"
      >
        <Flex vertical align="center" justify="center">
          <Card className="!rounded-xl py-2 shadow-xl">
            <Link to="/">
              <img className="h-24 mx-auto mb-5" src={g2} />
            </Link>
            <Outlet />
          </Card>
        </Flex>
      </Row>
    </ConfigProvider>
  );
}

export default AuthenticationLayout;

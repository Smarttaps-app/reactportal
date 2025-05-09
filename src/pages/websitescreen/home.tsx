import { Typography, Button, Space, Flex } from "antd";
import g1 from "../../assets/1.png";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <Space
      direction="vertical"
      id="home"
      className="grid text-center h-1/3 px-20 my-2"
    >
      <Flex justify="space-between">
        <img alt="avatar" src={g1} className="h-96 px-6" />
        <Flex
          vertical
          align="flex-center"
          justify="space-between"
          style={{ padding: 32 }}
        >
          <Typography.Title level={3}>
            {import.meta.env.VITE_APP_NAME} is a an online game where users
            answer simple questions and stand a chance to win big. Users can win
            over 1 million monthly. This novel initiative is intended to empower
            the masses economically with the much-needed funds in the face of an
            ailing economy and rising inflation and unemployment rates.
          </Typography.Title>
          <Link to="game/play" className="py-12">
            <Button type="primary" className="rounded-md shadow-md py-5 px-12">
              Get Started
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Space>
  );
}

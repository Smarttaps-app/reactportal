import { Col, Card, Row, Typography, Tooltip, Space } from "antd";
import {
  NotificationTwoTone,
  PlayCircleTwoTone,
  TrophyTwoTone,
} from "@ant-design/icons";

const { Text } = Typography;
const cardTitleStyle = {
  borderBottom: "none",
};
export default function HowToPlay() {
  return (
    <Space
      direction="vertical"
      id="how"
      className="grid text-center py-5 px-20"
    >
      <h1 className="text-3xl p-5">About {import.meta.env.VITE_APP_NAME}</h1>
      <Row gutter={24} className="mx-auto">
        <Col span={8}>
          <Card
            className="hover:bg-gradient-to-r from-purple-500 to-orange-500  hover:text-white transition-colors duration-300 !shadow-xl !rounded-xl px-5"
            title={
              <div style={cardTitleStyle} className="p-3">
                <Tooltip title="Subscribe">
                  <NotificationTwoTone
                    className="text-6xl block "
                    key="Subscribe"
                    title="Subscribe"
                    content="Subscribe"
                  ></NotificationTwoTone>
                  <Text italic className=" text-xl hover:text-white">
                    Mission
                  </Text>
                </Tooltip>
              </div>
            }
            variant="borderless"
          >
            {import.meta.env.VITE_APP_NAME} is a an online game where users
            answer simple questions and stand a chance to win big. Users can win
            over 1 million monthly. This novel initiative is intended to empower
            the masses economically with the much-needed funds in the face of an
            ailing economy and rising inflation and unemployment rates.
          </Card>
        </Col>
        <Col span={8}>
          <Card
            className="hover:bg-gradient-to-r from-purple-500 to-orange-500 hover:text-white transition-colors duration-300 !shadow-xl !rounded-xl px-5"
            title={
              <div className="p-3">
                <Tooltip title="Play" color="#eb2f96">
                  <PlayCircleTwoTone
                    twoToneColor="#eb2f96"
                    className="text-6xl text-black block"
                    key="Play"
                    title="Play"
                    content="Play"
                  />
                  <Text italic className=" text-xl">
                    Vission
                  </Text>
                </Tooltip>
              </div>
            }
            bordered={false}
          >
            {import.meta.env.VITE_APP_NAME} is a an online game where users
            answer simple questions and stand a chance to win big. Users can win
            over 1 million monthly. This novel initiative is intended to empower
            the masses economically with the much-needed funds in the face of an
            ailing economy and rising inflation and unemployment rates.
          </Card>
        </Col>
        <Col span={8}>
          <Card
            className="hover:bg-gradient-to-r from-purple-500 to-orange-500  hover:text-white transition-colors duration-300 !shadow-xl !rounded-xl px-5"
            title={
              <div className="p-3">
                <Tooltip title="Win" color="#52c41a">
                  <TrophyTwoTone
                    twoToneColor="#52c41a"
                    className="text-6xl text-black block"
                    key="Win"
                    title="Win"
                    content="Win"
                  />
                  <Text italic className=" text-xl">
                    Core Values
                  </Text>
                </Tooltip>
              </div>
            }
            bordered={false}
          >
            {import.meta.env.VITE_APP_NAME} is a an online game where users
            answer simple questions and stand a chance to win big. Users can win
            over 1 million monthly. This novel initiative is intended to empower
            the masses economically with the much-needed funds in the face of an
            ailing economy and rising inflation and unemployment rates.
          </Card>
        </Col>
      </Row>
    </Space>
  );
}

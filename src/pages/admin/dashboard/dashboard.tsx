import { Card, Col, Row, Statistic } from "antd";
import { useAnalytics } from "./useAnalytics";

export default function Dashboard() {
  const { isPending, data, error } = useAnalytics();
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Card className="rounded-lg shadow-lg">
            <Statistic
              title="Total Users"
              loading={isPending}
              value={error ? 0 : data?.users}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="rounded-lg shadow-lg">
            <Statistic
              title="Total Active Subscription"
              value={error ? 0 : data?.subscriptions}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="rounded-lg shadow-lg">
            <Statistic
              title="Total Game"
              value={error ? 0 : data?.games}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

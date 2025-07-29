import { Card, Col, Statistic, Typography } from "antd";
import { Common } from "../../../utils/Common";
import { ITicket } from "../../../utils/type";
interface TicketCardProps {
  title: string;
  sessionKey: string;
  loading: boolean;
  valueKey: string;
  data: ITicket[];
  error: boolean;
}
const TicketCard: React.FC<TicketCardProps> = ({
  title,
  sessionKey,
  valueKey,
  loading,
  data,
  error,
}) => {
  const totalSum = Common.countByKey(
    data,
    sessionKey as keyof ITicket,
    valueKey
  );

  return (
    <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
      <Card
        style={{ backgroundColor: Common.getcolorcode(valueKey) }}
        className={`!rounded-lg !shadow-lg`}
      >
        <Statistic
          title={
            <Typography.Text className="!text-white">{title}</Typography.Text>
          }
          loading={loading}
          value={error ? 0 : totalSum}
          valueStyle={{ color: "#fff" }}
        />
      </Card>
    </Col>
  );
};

export default TicketCard;

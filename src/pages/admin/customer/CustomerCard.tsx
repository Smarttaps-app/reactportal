import { Card, Col, Statistic } from "antd";
import { Common } from "../../../utils/Common";
import { CustomerCardProps, ICustomer } from "../../../utils/type";

const CustomerCard: React.FC<CustomerCardProps> = ({
  title,
  sessionKey,
  valueKey,
  loading,
  data,
  error,
}) => {
  const totalSum = Common.countByKey(
    data,
    valueKey as keyof ICustomer,
    sessionKey
  );
  const valueColor = totalSum > 0 ? "#3f8600" : "#ff4d4f";

  return (
    <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
      <Card className="!rounded-lg">
        <Statistic
          title={title}
          loading={loading}
          value={error || !data ? 0 : totalSum}
          valueStyle={{ color: valueColor }}
        />
      </Card>
    </Col>
  );
};

export default CustomerCard;

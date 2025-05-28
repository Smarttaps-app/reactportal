import { Card, ConfigProvider, Statistic, Tag } from "antd";
import { Common } from "../../../utils/Common";
import { PaymentCardProps } from "../../../utils/type";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  sessionKey,
  loading,
  data,
  error,
}) => {
  const payments =
    error || !data
      ? []
      : data.filter(
          (tx) => tx.payment_type.toLowerCase() === sessionKey.toLowerCase()
        );
  const totalSum = Common.sumTotalByKey(payments, "amount");
  const valueColor = sessionKey === "credit" ? "#3f8600" : "#ff4d4f";

  return (
    <ConfigProvider
      theme={{
        components: {
          Statistic: {
            contentFontSize: 16,
            titleFontSize: 16,
          },
          Card: {
            borderRadius: 12,
            bodyPadding: 16,
            bodyPaddingSM: 8,
          },
        },
      }}
    >
      <Card className="!rounded-lg !shadow-lg">
        <Statistic
          title={title}
          loading={loading}
          prefix={
            sessionKey === "credit" ? (
              <ArrowUpOutlined />
            ) : (
              <ArrowDownOutlined />
            )
          }
          value={
            totalSum < 0
              ? Common.formatAsCurrency(0)
              : Common.formatAsCurrency(totalSum)
          }
          valueStyle={{ color: valueColor }}
        />
        <Tag bordered={false} color={sessionKey === "credit" ? "green" : "red"}>
          {`${payments.length > 0 ? payments.length : 0} ${
            sessionKey.charAt(0).toUpperCase() + sessionKey.slice(1)
          }`}
        </Tag>
      </Card>
    </ConfigProvider>
  );
};

export default PaymentCard;

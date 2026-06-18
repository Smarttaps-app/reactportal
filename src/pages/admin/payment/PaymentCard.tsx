import { Tag } from "antd";
import { Common } from "../../../utils/Common";
import { PaymentCardProps } from "../../../utils/type";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  sessionKey,
  loading,
  data,
  error,
  color,
}) => {
  const payments =
    error || !data
      ? []
      : data.filter(
          (tx) => tx.payment_type?.toLowerCase() === sessionKey.toLowerCase(),
        );
  const totalSum = Common.sumTotalByKey(payments, "amount");

  return (
    <div
      className={`text-black border-l-5 p-3 rounded-xl text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 ease-linear transition-transform duration-300 bg-white border-${color}-600 `}
    >
      <div className="space-y-1">
        <p className={`mb-2 text-xl font-medium text-black`}>
          {(loading && error) || !data
            ? 0
            : totalSum < 0
              ? Common.formatAsCurrency(0)
              : Common.formatAsCurrency(totalSum)}
        </p>

        <p
          className={`text-xs font-semibold  uppercase tracking-wide text-${color}-600`}
        >
          {title}
        </p>

        <div className="flex w-full justify-between space-y-1">
          <div>
            <Tag
              icon={
                sessionKey === "credit" ? (
                  <ArrowUpOutlined color={color} />
                ) : (
                  <ArrowDownOutlined color={color} />
                )
              }
              bordered={false}
              color={color}
            >
              {` ${sessionKey.charAt(0).toUpperCase() + sessionKey.slice(1)}`}
            </Tag>
          </div>
          <div>
            <p className="item-right">
              {payments.length > 0 ? payments.length : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;

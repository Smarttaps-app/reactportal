import { Col, Tag } from "antd";
import { Common } from "../../../utils/Common";
import { ICashout } from "../../../utils/type";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
export interface CashoutCardProps {
  title: string;
  sessionKey: string;
  loading: boolean;
  data: ICashout[];
  error: boolean;
  color: string;
  children?: ReactNode;
}
const CashoutCard: React.FC<CashoutCardProps> = ({
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
          (tx) =>
            tx.withdrawalStatus.toLowerCase() === sessionKey.toLowerCase(),
        );
  const totalSum = Common.sumTotalByKey(payments, "amount");

  return (
    <Col className="gutter-row" xs={24} sm={12} md={8} lg={6} xl={6}>
      <div
        className={`text-black border-l-15 p-3 rounded-lg text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl shadow hover:-translate-y-0.5 ease-linear transition-transform duration-300 bg-${color}-50 border-${color}-600 `}
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
    </Col>
  );
};

export default CashoutCard;

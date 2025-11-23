import {
  Descriptions,
  DescriptionsProps,
  Empty,
  Modal,
  Row,
  Space,
  Tag,
} from "antd";
import { ICashout } from "../../../utils/type";
import { Common } from "../../../utils/Common";
import { useCashout } from "./useCashout";

export interface ICashoutProps {
  payload?: ICashout;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
const ViewScreen: React.FC<ICashoutProps> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { loading, cashout, error } = useCashout(payload?.id ?? 0);
  if (error)
    return (
      <Row justify="center" className="my-3">
        <Empty description={Common.formatError(error)} />
      </Row>
    );
  const items: DescriptionsProps["items"] = [
    {
      label: "Receipt",
      children: cashout?.cashout?.recipient,
    },
    {
      label: "Type",
      children: cashout?.cashout?.withdrawalStatus || "No remarks provided",
    },
    {
      label: "Status",
      span: "filled",
      children: cashout?.cashout?.statusCode || "No remarks provided",
    },
    {
      label: "Amount",
      span: "filled",
      children: Common.formatAsCurrency(
        cashout?.cashout?.amount ? Number(cashout.cashout?.amount) : 0
      ),
    },
    {
      label: "Remark",
      span: "filled",
      children: cashout?.cashout?.reason || "No remarks provided",
    },
    {
      label: "Date",
      span: "filled",
      children: Common.formatDate(cashout?.cashout?.created_at),
    },
  ];
  const payment: DescriptionsProps["items"] = [
    {
      label: "Product",
      span: 1,
      children: cashout?.payment?.product || "",
    },
    {
      label: "Service",
      span: 1,
      children: cashout?.payment?.service || "",
    },
    {
      label: "Channel",
      span: 1,
      children: cashout?.payment?.channel || "",
    },
    {
      label: "Recipient",
      span: 1,
      children: cashout?.payment?.recipient || "",
    },
    {
      label: "Status",
      span: 1,
      children: cashout?.payment?.status || "",
    },
    {
      label: "Reference",
      span: "filled",
      children: cashout?.payment?.reference || "",
    },
    {
      label: "Payment type",
      span: 1,
      children: (
        <Tag
          color={`${
            cashout?.payment?.payment_type == "CREDIT" ? "green" : "red"
          }`}
        >
          {cashout?.payment?.payment_type || ""}
        </Tag>
      ),
    },
    {
      label: "Amount",
      span: "filled",
      children: Common.formatAsCurrency(
        cashout?.payment?.amount ? Number(cashout.payment?.amount) : 0
      ),
    },
    {
      label: "Message",
      span: "filled",
      children: cashout?.payment?.statusMessage,
    },
    {
      label: "Date Added",
      span: "filled",
      children: Common.formatDate(cashout?.payment?.created_at),
    },
  ];
  return (
    <Modal
      style={{ top: 10 }}
      open={isOpen}
      maskClosable={false}
      loading={loading}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      width={900}
    >
      <Space direction="vertical" className="w-full">
        <Descriptions
          bordered
          title="Cashout Details"
          size="small"
          items={items}
        />
        <Descriptions
          title="Payment Details"
          size="small"
          bordered
          items={payment}
        />
      </Space>
    </Modal>
  );
};
export default ViewScreen;

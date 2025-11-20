import { Descriptions, DescriptionsProps, Modal, Tag } from "antd";
import { IShowPaymentProps } from "../../../utils/type";
import { Common } from "../../../utils/Common";

const ShowPayment: React.FC<IShowPaymentProps> = ({
  payment,
  isOpen = false,
  onCancel,
}) => {
  const items: DescriptionsProps["items"] = [
    {
      label: "Receipt",
      children: payment?.recipient,
    },
    {
      label: "Amount",
      span: "filled",
      children: Common.formatAsCurrency(
        payment?.amount ? Number(payment.amount) : 0
      ),
    },
    {
      label: "Transaction Type",
      children: payment?.payment_type || "Not provided",
    },
    {
      label: "Transaction Status",
      span: "filled",
      children: (
        <Tag color={Common.paymentStatusColor(payment?.status ?? "")}>
          {payment?.status}
        </Tag>
      ),
    },
    {
      label: "Product",
      span: "filled",
      children: payment?.product || "Not provided",
    },
    {
      label: "Service",
      span: "filled",
      children: payment?.service || "Not provided",
    },
    {
      label: "Transaction Date",
      span: "filled",
      children: Common.formatDate(payment?.created_at),
    },
    {
      label: "Remark",
      span: "filled",
      children: payment?.statusMessage || "Not provided",
    },
  ];
  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      width={750}
    >
      <Descriptions bordered title="Payment Details" items={items} />
    </Modal>
  );
};
export default ShowPayment;

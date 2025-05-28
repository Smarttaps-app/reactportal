import {
  Button,
  Descriptions,
  DescriptionsProps,
  Flex,
  Modal,
  Space,
} from "antd";
import { IShowPaymentProps } from "../../../utils/type";
import { CloseOutlined, PrinterOutlined } from "@ant-design/icons";
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
      children: payment?.payment_type || "No remarks provided",
    },
    {
      label: "Transaction Date",
      span: "filled",
      children: Common.formatDate(payment?.created_at),
    },
    {
      label: "Transaction Status",
      span: "filled",
      children: payment?.status || "No remarks provided",
    },
    {
      label: "Remark",
      span: "filled",
      children: payment?.statusMessage || "No remarks provided",
    },
  ];
  return (
    <Modal
      style={{ top: 20 }}
      open={isOpen}
      maskClosable={false}
      // confirmLoading={updating}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
      width={750}
    >
      <Space direction="vertical" className="w-full">
        <Descriptions bordered title="Payment Details" items={items} />
        <Flex className="mt-8" justify="center" gap={16}>
          <Button type="primary" icon={<PrinterOutlined />}>
            Print
          </Button>
          <Button
            color="cyan"
            variant="filled"
            icon={<CloseOutlined />}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Flex>
      </Space>
    </Modal>
  );
};
export default ShowPayment;

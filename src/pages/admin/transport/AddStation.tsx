import {
  Button,
  Descriptions,
  DescriptionsProps,
  Flex,
  Modal,
  Space,
} from "antd";
import { IAddProps, IStation } from "../../../utils/type";
import { CloseOutlined, PrinterOutlined } from "@ant-design/icons";
import { Common } from "../../../utils/Common";

const AddStation: React.FC<IAddProps<IStation>> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const items: DescriptionsProps["items"] = [
    {
      label: "Receipt",
      children: payload?.recipient,
    },
    {
      label: "Amount",
      span: "filled",
      children: Common.formatAsCurrency(
        payload?.amount ? Number(payload.amount) : 0
      ),
    },
    {
      label: "Transaction Type",
      children: payload?.station_type || "No remarks provided",
    },
    {
      label: "Transaction Date",
      span: "filled",
      children: Common.formatDate(payload?.created_at),
    },
    {
      label: "Transaction Status",
      span: "filled",
      children: payload?.status || "No remarks provided",
    },
    {
      label: "Remark",
      span: "filled",
      children: payload?.statusMessage || "No remarks provided",
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
export default AddStation;

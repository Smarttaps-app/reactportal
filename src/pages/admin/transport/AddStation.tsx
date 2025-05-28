import {
  Button,
  Descriptions,
  DescriptionsProps,
  Flex,
  Modal,
  Space,
} from "antd";
import { IStation } from "../../../utils/type";
import { CloseOutlined, PrinterOutlined } from "@ant-design/icons";
import { Common } from "../../../utils/Common";
interface IStationProps {
  station?: IStation;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
const AddStation: React.FC<IStationProps> = ({
  station,
  isOpen = false,
  onCancel,
}) => {
  const items: DescriptionsProps["items"] = [
    {
      label: "Receipt",
      children: station?.recipient,
    },
    {
      label: "Amount",
      span: "filled",
      children: Common.formatAsCurrency(
        station?.amount ? Number(station.amount) : 0
      ),
    },
    {
      label: "Transaction Type",
      children: station?.station_type || "No remarks provided",
    },
    {
      label: "Transaction Date",
      span: "filled",
      children: Common.formatDate(station?.created_at),
    },
    {
      label: "Transaction Status",
      span: "filled",
      children: station?.status || "No remarks provided",
    },
    {
      label: "Remark",
      span: "filled",
      children: station?.statusMessage || "No remarks provided",
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

import {
  App,
  Button,
  Descriptions,
  DescriptionsProps,
  Empty,
  Flex,
  Modal,
  Row,
  Space,
} from "antd";
import { ITicket } from "../../../utils/type";
import { CloseOutlined, PrinterOutlined } from "@ant-design/icons";
import { Common } from "../../../utils/Common";
import { useQueryClient } from "@tanstack/react-query";
import { useTicket } from "./useTicket";
interface ITicketProps {
  payload?: ITicket;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
const ShowTicket: React.FC<ITicketProps> = ({
  payload,
  isOpen = false,
  onCancel,
}) => {
  const { message } = App.useApp();
  const client = useQueryClient();
  const { loading, ticket, error } = useTicket(payload?.id ?? "");
  if (error)
    return (
      <Row justify="center" className="my-3">
        <Empty description={Common.formatError(error)} />
      </Row>
    );
  const items: DescriptionsProps["items"] = [
    {
      label: "Ticket Number",
      children: ticket?.ticket_number,
    },
    {
      label: "Amount",
      span: "filled",
      children: Common.formatAsCurrency(
        ticket?.price ? Number(ticket.price) : 0
      ),
    },
    {
      label: "Ticket Type",
      children: ticket?.mode || "No remarks provided",
    },
    {
      label: "Transaction Date",
      span: "filled",
      children: Common.formatDate(ticket?.created_at),
    },
    {
      label: "Transaction Status",
      span: "filled",
      children: ticket?.status || "No remarks provided",
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
      width={800}
    >
      <Space direction="vertical" className="w-full">
        <Descriptions bordered title="Ticket Details" items={items} />
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
export default ShowTicket;

import {
  Button,
  Card,
  DatePicker,
  Empty,
  Input,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import { SearchOutlined } from "@ant-design/icons";
import { ITicket } from "../../../utils/type";
import TicketCard from "./TicketCard";
import { useTickets } from "./useTicket";
import ShowTicket from "./ShowTicket";
import { Search } from "lucide-react";
const { RangePicker } = DatePicker;

export default function TicketsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState<ITicket>();
  const [selectedDates, setSelectedDates] = useState<
    [dayjs.Dayjs, dayjs.Dayjs]
  >([dayjs().subtract(30, "day"), dayjs()]);
  const {
    loading,
    tickets,
    error,
    refetch: refetched,
  } = useTickets(selectedDates);
  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setSelectedDates([dates[0], dates[1]]);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "5%",
      },
      {
        title: "Ticket Number",
        dataIndex: "ticket_number",
        key: "ticket_number",
        width: "15%",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: "10%",
        render: (amount: string) => Common.formatAsCurrency(Number(amount)),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "10%",
        render: (status: string) => (
          <Tag color={`${Common.getcolorcode(status)}`}>{status}</Tag>
        ),
      },
      {
        title: "Mode",
        dataIndex: "mode",
        key: "mode",
        width: "7%",
      },
      {
        title: "Date",
        dataIndex: "booked_at",
        key: "booked_at",
        render: (created: string) => Common.formatDate(created),
        ellipsis: true,
      },
      {
        title: "Expired",
        dataIndex: "expired_at",
        key: "expired_at",
        render: (updated: string) => Common.formatDate(updated),
        ellipsis: true,
      },
      {
        title: "Actions",
        dataIndex: "",
        render: (_key: string, ticket: ITicket) => (
          <Button
            type="primary"
            color="cyan"
            onClick={() => {
              setTicket(ticket);
              setShow(true);
            }}
          >
            view{" "}
          </Button>
        ),
      },
    ],
    []
  );
  if (error)
    return (
      <Row justify="center" className="my-3">
        <Empty description={Common.formatError(error)} />
      </Row>
    );

  const data =
    tickets.filter(
      (ticket: ITicket) =>
        ticket.ticket_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.mode.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <>
      <Row
        className="pb-4"
        align="middle"
        gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}
      >
        <TicketCard
          title="Total All"
          sessionKey="status"
          valueKey="all"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <TicketCard
          title="Total Booked"
          sessionKey="status"
          valueKey="booked"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <TicketCard
          title="Total Used"
          sessionKey="status"
          valueKey="used"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <TicketCard
          title="Total Expired"
          sessionKey="status"
          valueKey="expired"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <TicketCard
          title="Total Cancelled"
          sessionKey="status"
          valueKey="cancelled"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
      </Row>
      <Card
        title="Ticketing"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-gray-50 border-gray-200 focus-visible:outline-none focus:ring-2 focus:!ring-primary focus:bg-white !ease-linear !duration-200 !transition-all"
              />
            </div>
            <RangePicker onChange={handleDateChange} />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => refetched()}
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              Search
            </Button>
          </Space>
        }
      >
        <Table
          rowKey="id"
          size="small"
          loading={loading}
          columns={columns}
          dataSource={data}
          scroll={{ x: "max-content" }}
        />
      </Card>
      <ShowTicket
        payload={ticket}
        isOpen={show}
        onCancel={() => setShow(false)}
      />
    </>
  );
}

import {
  Button,
  Card,
  DatePicker,
  Empty,
  Flex,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import { EyeOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { ITicket } from "../../../utils/type";
import TicketCard from "./TicketCard";
import { useTicket } from "../../../hooks/useTicket";
import ShowTicket from "./ShowTicket";
const { RangePicker } = DatePicker;

export default function TicketsScreen() {
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
  } = useTicket(selectedDates);
  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null] | null
    // dateStrings: [string, string]
  ) => {
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
        render: (key: string, ticket: ITicket) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                setTicket(ticket);
                setShow(true);
              }}
            />
            <Button
              type="primary"
              icon={<RedoOutlined />}
              // loading={loadings[2]}
              //onClick={() => enterLoading(2)}
            />
          </Flex>
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

  const data: ITicket[] = tickets || [];

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
        ticket={ticket}
        isOpen={show}
        onCancel={() => setShow(false)}
      />
    </>
  );
}

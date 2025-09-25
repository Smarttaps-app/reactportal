import {
  Button,
  Empty,
  Row,
  DatePicker,
  Space,
  Input,
  Typography,
  Spin,
  Avatar,
  Badge,
  Tag,
} from "antd";
import { useState } from "react";
import { Common } from "../../../utils/Common";
import dayjs, { Dayjs } from "dayjs";
import { ISupportTicket } from "../../../utils/type";
import { SearchOutlined } from "@ant-design/icons";
import { Search } from "lucide-react";
import CountCard from "../../../widgets/CountCard";
import { useSupportTickets } from "./useSupports";
import SupportTicketResponse from "./add";
const { RangePicker } = DatePicker;
export default function SupportTicketScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  //const [messageApi, contextHolder] = message.useMessage();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<ISupportTicket>();
  const [selectedDates, setSelectedDates] = useState<
    [dayjs.Dayjs, dayjs.Dayjs]
  >([dayjs().subtract(30, "day"), dayjs()]);
  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setSelectedDates([dates[0], dates[1]]);
    }
  };
  const { loading, supports, error, refetch } =
    useSupportTickets(selectedDates);
  if (error)
    return (
      <Row justify="center" className="my-3">
        <Empty description={Common.formatError(error)} />
      </Row>
    );

  const data =
    supports.filter(
      (support: ISupportTicket) =>
        support.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        support.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        support.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        support.priority.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <>
      {/*contextHolder*/}
      <div className="grid gap-1 items-end">
        <div className="flex justify-between p-4 rounded-lg ">
          <Space className="flex items-center gap-4">
            <CountCard
              title="All Ticket"
              value={error ? 0 : data?.length}
              color="bg-white border-green-600"
              children={loading && <Spin />}
            />
            <CountCard
              title="Open Ticket"
              value={error ? 0 : data?.length}
              color="bg-white border-red-600"
              children={loading && <Spin />}
            />{" "}
            <CountCard
              title="Not Assigned"
              value={error ? 0 : data?.length}
              color="bg-white border-green-600"
              children={loading && <Spin />}
            />
            <CountCard
              title="Pending Ticket"
              value={error ? 0 : data?.length}
              color="bg-white border-yellow-600"
              children={loading && <Spin />}
            />
            <CountCard
              title="Closed Ticket"
              value={error ? 0 : data?.length}
              color="bg-white border-green-600"
              children={loading && <Spin />}
            />
          </Space>
          <Space className="bg-white p-4 rounded-lg">
            <RangePicker onChange={handleDateChange} />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => refetch()}
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              Search
            </Button>
          </Space>
        </div>
        <div className="lg:grid gap-2 lg:grid-cols-6 p-4">
          <div className="lg:col-span-2 space-y-2">
            <div className="p-5 bg-white rounded-md ">
              <Typography.Text className="font-md">
                Support Tickets
              </Typography.Text>

              <div className="relative flex-1 max-w-md my-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  size="large"
                  placeholder="Search ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-6 bg-gray-50 border-gray-200 focus-visible:outline-none focus:ring-2 focus:!ring-primary focus:bg-white !ease-linear !duration-200 !transition-all"
                />
              </div>
              {loading ? (
                <Spin />
              ) : error ? (
                <Typography.Text className="text-red-600">
                  {Common.formatError(error)}
                </Typography.Text>
              ) : data.length === 0 ? (
                <Typography.Text>No notifications found</Typography.Text>
              ) : (
                <div className="space-y-2 max-h-screen overflow-y-auto pr-2">
                  {data.map((notification: ISupportTicket) => (
                    <div
                      key={notification.id}
                      className={`p-2 bg-gray-50 shadow ${
                        selected?.id === notification.id
                          ? "bg-orange-50 border-2 border-orange-500"
                          : ""
                      } cursor-pointer hover:bg-gray-50 rounded-lg`}
                      onClick={() => setSelected(notification)}
                    >
                      <div className="flex justify-between p-2">
                        <div className="flex gap-2">
                          <Avatar
                            style={{
                              backgroundColor: "#fde3cf",
                              color: "#f56a00",
                            }}
                          >
                            {notification.status?.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography.Text className="text-sm p-1">
                            {notification.subject}
                          </Typography.Text>
                        </div>
                        <div>
                          <Typography.Text className="text-xs text-gray-500 p-1">
                            {Common.formatDate(notification.created_at)}
                          </Typography.Text>
                        </div>
                      </div>
                      <div className="my-2 p-4">
                        <Typography.Text className="text-sm">
                          {notification.description}
                        </Typography.Text>
                      </div>
                      <div className="flex justify-between p-2">
                        <Tag color={Common.colorCode(notification.status)}>
                          {notification.status}
                        </Tag>
                        <Badge
                          size="default"
                          color={Common.colorCode(notification.priority)}
                          text={notification.priority}
                        />
                        <div>
                          <Typography.Text className="text-sm">
                            {notification.comments?.length} comments
                          </Typography.Text>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-4">
            {selected && (
              <SupportTicketResponse
                payload={selected}
                isOpen={show}
                onCancel={() => setShow(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

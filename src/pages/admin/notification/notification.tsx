import {
  Button,
  Card,
  Empty,
  Flex,
  message,
  Row,
  DatePicker,
  Space,
  Table,
} from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import dayjs, { Dayjs } from "dayjs";
import {
  useDeleteNotification,
  useNotifications,
} from "../../../hooks/useNotification";
import { INotification } from "../../../utils/type";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import AddNotification from "./add";
import StatCard from "../../../widgets/StatCard";
const { RangePicker } = DatePicker;
export default function NotificationScreen() {
  const [messageApi, contextHolder] = message.useMessage();
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState<INotification>();
  const [selectedDates, setSelectedDates] = useState<
    [dayjs.Dayjs, dayjs.Dayjs]
  >([dayjs().subtract(30, "day"), dayjs()]);
  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setSelectedDates([dates[0], dates[1]]);
    }
  };
  const { loading, notifications, error, refetch } =
    useNotifications(selectedDates);
  const { isdeleting, deleteNotification } = useDeleteNotification();
  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: "20%",
      },
      {
        title: "Description",
        dataIndex: "message",
        key: "message",
      },
      {
        title: "Read",
        dataIndex: "isRead",
        key: "isRead",
        width: "10%",
        render: (keyValue: boolean) => (keyValue ? "Read" : "Not Read"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "10%",
        render: (keyValue: boolean) => (keyValue ? "Active" : "Inactive"),
      },
      {
        title: "Date Joined",
        dataIndex: "created_at",
        key: "created_at",
        width: "15%",
        render: (keyValue: string) => Common.formatDate(keyValue),
      },
      {
        title: "Actions",
        dataIndex: "",
        width: "15%",
        render: (key: string, data: INotification) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => deleted(data.id)}
              danger
              loading={isdeleting}
            />
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setNotification(data)}
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
  const deleted = (id: number) => {
    deleteNotification(id, {
      onSuccess: (response) => {
        console.log(response);
        messageApi.success(response.statusDescription);
      },
      onError: (error) => messageApi.error(Common.formatError(error)),
    });
  };
  if (error)
    return (
      <Row justify="center" className="my-3">
        <Empty description={Common.formatError(error)} />
      </Row>
    );

  const data: INotification[] = notifications || [];

  return (
    <>
      {contextHolder}
      <Row className="pb-8" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
        <StatCard
          title="All Notifications"
          sessionKey="all"
          valueKey="all"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <StatCard
          title="Total Active"
          sessionKey="active"
          valueKey="active"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <StatCard
          title="Total Failed"
          sessionKey="inactive"
          valueKey="inactive"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
      </Row>
      <Card
        extra={
          <Space>
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
        }
        className="!shadow-sm !rounded-lg"
        loading={loading}
        title={
          <Space className="flex items-center">
            <Button
              icon={<PlusOutlined />}
              title="New Notification"
              type="primary"
              //onClick={() => setOpen(true)}
            >
              New Notification
            </Button>
            <span className="text-sm text-gray-500">Total: {data.length}</span>
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
      <AddNotification
        payload={notification}
        isOpen={show}
        onCancel={() => setShow(false)}
      />
    </>
  );
}

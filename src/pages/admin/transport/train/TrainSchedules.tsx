import {
  App,
  Avatar,
  Button,
  Card,
  Empty,
  Flex,
  Input,
  Row,
  Space,
  Table,
} from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../../utils/Common";
import { BarsOutlined, PlusOutlined } from "@ant-design/icons";
import { ISchedule } from "../../../../utils/type";
import { useSchedules, useDeleteSchedule } from "./useTrain";
import { useQueryClient } from "@tanstack/react-query";
import AddSchedule from "./AddSchedule";
import { Search } from "lucide-react";

export default function TrainSchedulesScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const { notification } = App.useApp();
  const client = useQueryClient();
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<ISchedule>();
  const { loading, schedules, error } = useSchedules();
  const { isdeleting, deleteSchedule } = useDeleteSchedule();

  const columns = useMemo(
    () => [
      {
        title: "",
        dataIndex: "image",
        key: "image",
        width: "5%",
        render: (avatar: string) => (
          <Avatar src={avatar} size="small" icon={<BarsOutlined />} />
        ),
      },
      {
        title: "Time Of Operation",
        dataIndex: "timeOfOperation",
        key: "timeOfOperation",
        width: "15%",
      },
      {
        title: "Arrival Time",
        dataIndex: "arrivalTime",
        key: "arrivalTime",
        width: "10%",
      },
      {
        title: "Departure Time",
        dataIndex: "departureTime",
        key: "departureTime",
        width: "10%",
      },
      {
        title: "Date",
        dataIndex: "created_at",
        key: "created_at",
        render: (created: string) => Common.formatDate(created),
        ellipsis: true,
      },
      {
        title: "Actions",
        dataIndex: "",
        width: "25%",
        render: (schedule: ISchedule) => (
          <Flex gap="small" align="center" wrap>
            <Button
              color="cyan"
              size="small"
              variant="solid"
              onClick={() => {
                setItem(schedule);
                setAdd(true);
              }}
            >
              View
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              disabled={isdeleting}
              loading={isdeleting}
              onClick={() =>
                deleteSchedule(schedule.identifier, {
                  onSuccess: (response) =>
                    notification.success({
                      message: "Delete Schedule",
                      description: response.statusDescription,
                    }),
                  onError: (error) =>
                    notification.error({
                      message: "Delete Schedule",
                      description: Common.formatError(error),
                    }),
                  onSettled: () =>
                    client.invalidateQueries({ queryKey: ["schedules"] }),
                })
              }
            >
              Delete
            </Button>
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

  const data =
    schedules.filter(
      (schedule: ISchedule) =>
        schedule?.daysOfOperation
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        schedule.arrivalTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.departureTime.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  return (
    <>
      <Card
        title="Schedules"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space className="flex items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-gray-50 border-gray-200 focus-visible:outline-none focus:ring-2 focus:!ring-primary focus:bg-white !ease-linear !duration-200 !transition-all"
              />
            </div>
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <Button
              icon={<PlusOutlined />}
              title="New Schedule"
              type="primary"
              onClick={() => {
                setItem(undefined);
                setAdd(true);
              }}
            >
              New Schedule
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
      <AddSchedule payload={item} isOpen={add} onCancel={() => setAdd(false)} />
    </>
  );
}

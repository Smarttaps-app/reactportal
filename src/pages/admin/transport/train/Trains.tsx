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
import { ITrain } from "../../../../utils/type";
import { useTrains } from "../../../../hooks/useTransport";
import AddTrain from "./AddTrain";
import { useDeleteTrain } from "./useTrain";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";

export default function TrainsScreen() {
  const { message } = App.useApp();
  const client = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<ITrain>();
  const { loading, trains, error } = useTrains();
  const { isdeleting, deleteTrain } = useDeleteTrain();

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
        title: "Train Name",
        dataIndex: "trainName",
        key: "trainName",
        width: "15%",
      },
      {
        title: "Train Number",
        dataIndex: "trainNumber",
        key: "trainNumber",
        width: "15%",
      },
      {
        title: "Schedule",
        dataIndex: "schedules",
        key: "schedules",
        width: "15%",
        render: (record: ITrain) => (
          <span className="text-xs text-gray-500">
            {record.schedules?.length > 0
              ? ` ${record.schedules?.length} Schedule`
              : `No Schedule`}
          </span>
        ),
      },
      {
        title: "Seat Class",
        dataIndex: "seats",
        key: "seats",
        width: "15%",
        render: (record: ITrain) => (
          <span className="text-xs text-gray-500">
            {record.seats?.length > 0
              ? ` ${record.seats?.length} Class`
              : `No Class`}
          </span>
        ),
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
        width: "20%",
        render: (train: ITrain) => (
          <Flex gap="small" align="center" wrap>
            <Button
              color="cyan"
              variant="solid"
              onClick={() => {
                setItem(train);
                setAdd(true);
              }}
            >
              View
            </Button>
            <Button
              type="primary"
              danger
              disabled={isdeleting}
              loading={isdeleting}
              onClick={() =>
                deleteTrain(train.id, {
                  onSuccess: (response) =>
                    message.success(response.statusDescription),
                  onError: (error) => message.error(Common.formatError(error)),
                  onSettled: () =>
                    client.invalidateQueries({ queryKey: ["trains"] }),
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
    trains.filter(
      (train: ITrain) =>
        train.trainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        train.trainNumber.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <>
      <Card
        title="Trains"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space className="flex items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search Train..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-gray-50 border-gray-200 focus-visible:outline-none focus:ring-2 focus:!ring-primary focus:bg-white !ease-linear !duration-200 !transition-all"
              />
            </div>
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <Button
              icon={<PlusOutlined />}
              title="New Train"
              type="primary"
              onClick={() => {
                setItem(undefined);
                setAdd(true);
              }}
            >
              New Train
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
      <AddTrain payload={item} isOpen={add} onCancel={() => setAdd(false)} />
    </>
  );
}

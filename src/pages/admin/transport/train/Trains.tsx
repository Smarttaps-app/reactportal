import {
  App,
  Avatar,
  Button,
  Card,
  Empty,
  Flex,
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

export default function TrainsScreen() {
  const { message } = App.useApp();
  const client = useQueryClient();
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
        title: "Bus Name",
        dataIndex: "trainName",
        key: "trainName",
        width: "25%",
      },
      {
        title: "Train Number",
        dataIndex: "trainNumber",
        key: "trainNumber",
        width: "10%",
      },
      {
        title: "Seat",
        dataIndex: "seatCount",
        key: "seatCount",
        width: "5%",
      },
      {
        title: "TV",
        dataIndex: "tv",
        key: "tv",
        width: "5%",
        render: (keyValue: boolean) => (keyValue ? "YES" : "NO"),
      },
      {
        title: "Camera",
        dataIndex: "camera",
        key: "camera",
        width: "8%",
        render: (keyValue: boolean) => (keyValue ? "YES" : "NO"),
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
        width: "15%",
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
                    client.invalidateQueries({ queryKey: ["busstations"] }),
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

  const data: ITrain[] = trains || [];

  return (
    <>
      <Card
        title="Trains"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space className="flex items-center">
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

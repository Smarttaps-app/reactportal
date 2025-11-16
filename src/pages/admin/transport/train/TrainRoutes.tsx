import { App, Button, Card, Empty, Flex, Row, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTRoute, useTRoutes } from "./useTrain";
import { ITrainRoute, ISeat, IStation } from "../../../../utils/type";
import { Common } from "../../../../utils/Common";
import AddRoute from "./AddRoute";

export default function TrainRoutesScreen() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<ITrainRoute>();
  const { loading, routes, error } = useTRoutes();
  const { isdeleting, deleteRoute } = useDeleteTRoute();

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "5%",
      },
      {
        title: "Departure",
        dataIndex: "sourceStation",
        key: "sourceStation",
        render: (sourceStation: IStation) => sourceStation?.stationName,
      },
      {
        title: "Arival",
        dataIndex: "destinationStation",
        key: "destinationStation",
        render: (destinationStation: IStation) =>
          destinationStation?.stationName,
      },
      {
        title: "Mode",
        dataIndex: "mode",
        key: "mode",
        width: "6%",
        render: (routeName: string, record: ITrainRoute) => (
          <span className="text-xs text-gray-500">
            {routeName}
            {record.trains.length > 0
              ? ` ${record.trains.length} Trains`
              : `No Train`}
          </span>
        ),
      },
      {
        title: "Price",
        dataIndex: "prices",
        key: "prices",
        width: "15%",
        render: (price: ISeat, record: ITrainRoute) => (
          <span className="text-xs text-gray-500">
            {record.prices?.length > 0
              ? record?.prices.map((seat, idx) => (
                  <span key={idx}>{`${
                    seat.classType
                  } - ${Common.formatAsCurrency(Number(seat.price))}\n`}</span>
                ))
              : `No Seat`}
          </span>
        ),
      },
      {
        title: "Updated",
        dataIndex: "updated_at",
        key: "updated_at",
        render: (updated: string) => Common.formatDate(updated),
        ellipsis: true,
      },
      {
        title: "Actions",
        dataIndex: "",
        width: "12%",
        render: (route: ITrainRoute) => (
          <Flex gap="small" align="center" wrap>
            <Button
              color="cyan"
              size="small"
              variant="solid"
              onClick={() => {
                setItem(route);
                setAdd(true);
              }}
            >
              View
            </Button>
            <Button
              type="primary"
              size="small"
              danger
              disabled={isdeleting}
              loading={isdeleting}
              onClick={() =>
                deleteRoute(route.identifier, {
                  onSuccess: (response) =>
                    notification.success({
                      message: "Delete Route",
                      description: response.statusDescription,
                    }),
                  onError: (error) =>
                    notification.error({
                      message: "Delete Route",
                      description: Common.formatError(error),
                    }),
                  onSettled: () =>
                    client.invalidateQueries({ queryKey: ["routes"] }),
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

  const data: ITrainRoute[] = routes || [];

  return (
    <>
      <Card
        title="Routes"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <Button
              icon={<PlusOutlined />}
              title="New Station"
              type="primary"
              onClick={() => {
                setItem(undefined);
                setAdd(true);
              }}
            >
              New Route
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
      <AddRoute payload={item} isOpen={add} onCancel={() => setAdd(false)} />
    </>
  );
}

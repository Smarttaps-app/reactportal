import { App, Button, Card, Empty, Flex, Row, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTRoute, useTRoutes } from "./useTrain";
import { IRoute, IStation } from "../../../../utils/type";
import { Common } from "../../../../utils/Common";
import AddRoute from "./AddRoute";

export default function TrainRoutesScreen() {
  const { message } = App.useApp();
  const client = useQueryClient();
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<IRoute>();
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
        title: "Route Name",
        dataIndex: "routeName",
        key: "routeName",
        width: "20%",
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
        render: (routeName: string, record: IRoute) => (
          <span className="text-xs text-gray-500">
            {routeName}
            {record.trains.length > 0
              ? ` ${record.buses.length} Trains`
              : `No Train`}
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
        width: "15%",
        render: (route: IRoute) => (
          <Flex gap="small" align="center" wrap>
            <Button
              color="cyan"
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
              danger
              disabled={isdeleting}
              loading={isdeleting}
              onClick={() =>
                deleteRoute(route.id, {
                  onSuccess: (response) =>
                    message.success(response.statusDescription),
                  onError: (error) => message.error(Common.formatError(error)),
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

  const data: IRoute[] = routes || [];

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

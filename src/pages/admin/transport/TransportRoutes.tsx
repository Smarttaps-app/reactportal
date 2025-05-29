import { Button, Card, Empty, Flex, Row, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import {
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { IRoute, IStation } from "../../../utils/type";
import { useRoutes } from "../../../hooks/useTransport";
import AddRoute from "./AddRoute";

export default function RoutesScreen() {
  const [show, setShow] = useState(false);
  const [route, setRoute] = useState<IRoute>();
  const { loading, routes, error } = useRoutes();

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
            {record.buses.length > 0
              ? ` ${record.buses.length} Buses`
              : ` ${record.trains.length} Trains`}
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
        render: (key: string, route: IRoute) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                setRoute(route);
                setShow(true);
              }}
            />
            <Button
              type="primary"
              icon={<RedoOutlined />}
              // loading={loadings[2]}
              //onClick={() => enterLoading(2)}
            />
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
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

  const data: IRoute[] = routes || [];

  return (
    <>
      <Card
        title="Stations"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <Button
              icon={<PlusOutlined />}
              title="New Station"
              type="primary"
              //onClick={() => setOpen(true)}
            >
              New Station
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
        />
      </Card>
      <AddRoute route={route} isOpen={show} onCancel={() => setShow(false)} />
    </>
  );
}

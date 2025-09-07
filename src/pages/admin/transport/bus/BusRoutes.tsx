import { App, Button, Card, Empty, Flex, Input, Row, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Search } from "lucide-react";
import AddRoute from "./AddRoute";
import { IRoute, IStation } from "../../../../utils/type";
import { useDeleteTRoute, useTRoutes } from "./useBus";
import { Common } from "../../../../utils/Common";

export default function BusRoutesScreen() {
  const { message } = App.useApp();
  const [searchTerm, setSearchTerm] = useState("");
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
        width: "25%",
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
        width: "8%",
        render: (routeName: string, record: IRoute) => (
          <span className="text-xs text-gray-500">
            {routeName}
            {record.buses.length > 0
              ? ` ${record.buses.length} Buses`
              : `No Bus`}
          </span>
        ),
      },
      {
        title: "Updated",
        dataIndex: "updated_at",
        key: "updated_at",
        width: "8%",
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
    routes.filter(
      (route: IRoute) =>
        route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.sourceStation.location
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        route.destinationStation.location
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <>
      <Card
        title="Routes"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search route..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-gray-50 border-gray-200 focus-visible:outline-none focus:ring-2 focus:!ring-primary focus:bg-white !ease-linear !duration-200 !transition-all"
              />
            </div>
            <Button
              icon={<PlusOutlined />}
              title="New Route"
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

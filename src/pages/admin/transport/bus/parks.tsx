import { App, Button, Card, Empty, Flex, Input, Row, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Search } from "lucide-react";
import { useDeleteStation, useStations } from "./useBus";
import { IStation } from "../../../../utils/type";
import AddStation from "./AddStation";
import { Common } from "../../../../utils/Common";
import { useQueryClient } from "@tanstack/react-query";

export default function BusStationsScreen() {
  const { message } = App.useApp();
  const client = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<IStation>();
  const { loading, stations, error } = useStations();
  const { isdeleting, deleteStation } = useDeleteStation();

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "5%",
      },
      {
        title: "Park Name",
        dataIndex: "stationName",
        key: "stationName",
        width: "30%",
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
      },
      {
        title: "Mode",
        dataIndex: "mode",
        key: "mode",
        width: "10%",
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
        render: (station: IStation) => (
          <Flex gap="small" align="center" wrap>
            <Button
              color="cyan"
              variant="solid"
              size="small"
              onClick={() => {
                setItem(station);
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
                deleteStation(station.id, {
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

  const data =
    stations.filter(
      (payment: IStation) =>
        payment.stationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.mode.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <>
      <Card
        title="Parks"
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
              title="New Park"
              type="primary"
              onClick={() => {
                setItem(undefined);
                setAdd(true);
              }}
            >
              New Park
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
      <AddStation payload={item} isOpen={add} onCancel={() => setAdd(false)} />
    </>
  );
}

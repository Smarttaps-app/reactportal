import { Button, Card, Empty, Flex, Input, Row, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Search } from "lucide-react";
import { useDeleteStation, useStations } from "./useBus";
import { IStation } from "../../../../utils/type";
import AddStation from "./AddStation";
import { Common } from "../../../../utils/Common";

const { VITE_API_IBASE_URL } = import.meta.env;
export default function BusStationsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<IStation>();
  const { loading, stations, error } = useStations();
  const { isdeleting, deleteStation } = useDeleteStation();

  const columns = useMemo(
    () => [
      {
        title: "",
        dataIndex: "parkImage",
        key: "parkImage",
        render: (parkImage: string) => (
          <img className="w-12" src={`${VITE_API_IBASE_URL}${parkImage}`} />
        ),
      },
      {
        title: "ID",
        dataIndex: "identifier",
        key: "identifier",
      },
      {
        title: "Park Name",
        dataIndex: "stationName",
        key: "stationName",
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
      },
      {
        title: "Contact",
        dataIndex: "contact",
        key: "contact",
      },
      {
        title: "companyName",
        dataIndex: "companyName",
        key: "companyName",
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
        render: (station: IStation) => (
          <Flex gap="small" align="center" wrap>
            <Button
              color="cyan"
              variant="solid"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => {
                setItem(station);
                setAdd(true);
              }}
            />
            <Button
              type="primary"
              size="small"
              icon={<DeleteOutlined />}
              danger
              disabled={isdeleting}
              loading={isdeleting}
              onClick={() => deleteStation(station.identifier)}
            />
          </Flex>
        ),
      },
    ],
    [],
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
        payment.mode.toLowerCase().includes(searchTerm.toLowerCase()),
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

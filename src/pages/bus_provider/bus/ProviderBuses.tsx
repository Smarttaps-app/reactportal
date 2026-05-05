import { Button, Card, Empty, Flex, Input, Row, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Search } from "lucide-react";
import { useBuses, useDeleteBus } from "./useBus";
import AddNewProviderBus from "./AddNewProviderBus";
import { IBus } from "../../../utils/type";
import { Common } from "../../../utils/Common";

const { VITE_API_IBASE_URL } = import.meta.env;

export default function ProviderBusesScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<IBus>();
  const { loading, buses, error } = useBuses();
  const { isdeleting, deleteBus } = useDeleteBus();

  const columns = useMemo(
    () => [
      {
        title: "",
        dataIndex: "busImage",
        key: "busImage",
        render: (busImage: string) => (
          <img className="w-12" src={`${VITE_API_IBASE_URL}${busImage}`} />
        ),
      },
      {
        title: "Owner",
        dataIndex: "companyName",
        key: "companyName",
      },
      {
        title: "Bus Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Bus Number",
        dataIndex: "bus_number",
        key: "bus_number",
      },
      {
        title: "Seat",
        dataIndex: "seatCount",
        key: "seatCount",
      },
      {
        title: "Price",
        dataIndex: "base_price",
        key: "base_price",
        render: (base_price: string) =>
          Common.formatAsCurrency(Number(base_price) * 100),
      },
      {
        title: "TV",
        dataIndex: "tv",
        key: "tv",
        render: (keyValue: boolean) => (keyValue ? "YES" : "NO"),
      },
      {
        title: "Camera",
        dataIndex: "camera",
        key: "camera",
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
        render: (bus: IBus) => (
          <Flex gap="small" align="center" wrap>
            <Button
              color="cyan"
              icon={<EyeOutlined />}
              variant="solid"
              size="small"
              onClick={() => {
                setItem(bus);
                setAdd(true);
              }}
            />
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
              disabled={isdeleting}
              loading={isdeleting}
              onClick={() => deleteBus(bus.identifier)}
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
    buses.filter(
      (bus: IBus) =>
        bus.bus_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  return (
    <>
      <Card
        title={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Buses</span>
            <Button
              icon={<PlusOutlined />}
              title="New Bus"
              type="primary"
              onClick={() => {
                setItem(undefined);
                setAdd(true);
              }}
            >
              Import Buses
            </Button>
          </Space>
        }
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-gray-50 border-gray-200 focus-visible:outline-none focus:ring-2 focus:!ring-primary focus:bg-white !ease-linear !duration-200 !transition-all"
              />
            </div>
            <Button
              icon={<PlusOutlined />}
              title="New Bus"
              type="primary"
              onClick={() => {
                setItem(undefined);
                setAdd(true);
              }}
            >
              New Bus
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
      <AddNewProviderBus
        payload={item}
        isOpen={add}
        onCancel={() => setAdd(false)}
      />
    </>
  );
}

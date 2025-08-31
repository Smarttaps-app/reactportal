import {
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
import {
  BarsOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { IBus } from "../../../../utils/type";
import { useBuses } from "../../../../hooks/useTransport";
import AddBus from "./AddBus";
import { Search } from "lucide-react";

export default function BusesScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<IBus>();
  const { loading, buses, error } = useBuses();

  const columns = useMemo(
    () => [
      {
        title: "",
        dataIndex: "busImage",
        key: "busImage",
        width: "5%",
        render: (avatar: string) => (
          <Avatar src={avatar} size="small" icon={<BarsOutlined />} />
        ),
      },
      {
        title: "Bus Name",
        dataIndex: "name",
        key: "name",
        width: "25%",
      },
      {
        title: "Bus Number",
        dataIndex: "bus_number",
        key: "bus_number",
        width: "10%",
      },
      {
        title: "Seat",
        dataIndex: "seatCount",
        key: "seatCount",
        width: "5%",
      },
      {
        title: "Price",
        dataIndex: "base_price",
        key: "base_price",
        width: "10%",
        render: (base_price: string) =>
          Common.formatAsCurrency(Number(base_price)),
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
        width: "12%",
        render: (key: string, station: IBus) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                setItem(station);
                setAdd(true);
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

  const data =
    buses.filter(
      (bus: IBus) =>
        bus.bus_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <AddBus payload={item} isOpen={add} onCancel={() => setAdd(false)} />
    </>
  );
}

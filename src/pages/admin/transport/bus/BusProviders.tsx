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
  DeleteOutlined,
  EyeOutlined,
  MoonOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { IPark } from "../../../../utils/type";
import { useParks } from "../../../../hooks/useTransport";
import AddPark from "./AddPark";
import { Search } from "lucide-react";

export default function ParksScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<IPark>();
  const { loading, parks, error } = useParks();

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "5%",
      },
      {
        title: "",
        dataIndex: "parkImage",
        key: "parkImage",
        width: "5%",
        render: (avatar: string) => (
          <Avatar src={avatar} size="small" icon={<MoonOutlined />} />
        ),
      },
      {
        title: "Park Name",
        dataIndex: "name",
        key: "name",
        width: "30%",
      },
      {
        title: "Location",
        dataIndex: "parkImage",
        key: "location",
      },
      {
        title: "Mode",
        dataIndex: "mode",
        key: "mode",
        width: "6%",
      },
      {
        title: "Date",
        dataIndex: "created_at",
        key: "created_at",
        render: (created: string) => Common.formatDate(created),
        ellipsis: true,
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
        render: (key: string, park: IPark) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => {
                setItem(park);
                setAdd(true);
              }}
            />
            <Button
              type="primary"
              size="small"
              icon={<RedoOutlined />}
              // loading={loadings[2]}
              //onClick={() => enterLoading(2)}
            />
            <Button
              type="primary"
              danger
              size="small"
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
    parks.filter(
      (payment: IPark) =>
        payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.address.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <>
      <Card
        title="Transport Companies"
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
              title="New Transport Company"
              type="primary"
              onClick={() => {
                setItem(undefined);
                setAdd(true);
              }}
            >
              New Transport Company
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
      <AddPark payload={item} isOpen={add} onCancel={() => setAdd(false)} />
    </>
  );
}

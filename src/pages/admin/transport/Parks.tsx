import { Avatar, Button, Card, Empty, Flex, Row, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import {
  DeleteOutlined,
  EyeOutlined,
  MoonOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { IPark } from "../../../utils/type";
import { useParks } from "../../../hooks/useTransport";
import AddPark from "./AddPark";

export default function ParksScreen() {
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
              icon={<EyeOutlined />}
              onClick={() => {
                setItem(park);
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

  const data: IPark[] = parks || [];

  return (
    <>
      <Card
        title="Parks"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space className="flex items-center">
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
      <AddPark payload={item} isOpen={add} onCancel={() => setAdd(false)} />
    </>
  );
}

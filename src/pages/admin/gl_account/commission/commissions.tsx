import { Button, Card, Empty, Flex, Row, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../../utils/Common";
import {
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { ICommission } from "../../../../utils/type";
import { useCommissions } from "../../../../hooks/useAccounting";
import AddCommission from "./AddCommission";

export default function CommissionsScreen() {
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<ICommission>();
  const { loading, commissions, error } = useCommissions();

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "5%",
      },
      {
        title: "GL Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
      },
      {
        title: "GL code",
        dataIndex: "code",
        key: "code",
        width: "20%",
      },
      {
        title: "GL Type",
        dataIndex: "gl_type",
        key: "gl_type",
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
        render: (key: string, ledger: ICommission) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                setItem(ledger);
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

  const data: ICommission[] = commissions || [];

  return (
    <>
      <Card
        title="Commissions"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <Button
              icon={<PlusOutlined />}
              title="New Commission"
              type="primary"
              onClick={() => {
                setItem(undefined);
                setAdd(true);
              }}
            >
              New Commission
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
      <AddCommission
        payload={item}
        isOpen={add}
        onCancel={() => setAdd(false)}
      />
    </>
  );
}

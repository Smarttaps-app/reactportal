import { Button, Card, Empty, Flex, Row, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../../utils/Common";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { IBiller, ICommission, IUser } from "../../../../utils/type";
import {
  useCommissions,
  useDeleteCommission,
} from "../../../../hooks/useAccounting";
import AddCommission from "./AddCommission";

export default function CommissionsScreen() {
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<ICommission>();
  const { loading, commissions, error } = useCommissions();
  const { deleteCommission, isdeleting } = useDeleteCommission();

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "glcode",
        key: "glcode",
      },
      {
        title: "Merchant Name",
        dataIndex: "admin",
        key: "admin",
        render: (admin: IUser) => (
          <span className="text-xs text-gray-500">
            {admin?.firstname} {admin?.lastname}
          </span>
        ),
      },
      {
        title: "Product",
        dataIndex: "product_type",
        key: "product_type",
        render: (biller: IBiller) => (
          <span className="text-xs text-gray-500">{biller?.billerName}</span>
        ),
      },
      {
        title: "Commission",
        dataIndex: "commission_rate",
        key: "commission_rate",
      },
      {
        title: "Mode",
        dataIndex: "commission_type",
        key: "commission_type",
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
              icon={<EditOutlined />}
              onClick={() => {
                setItem(ledger);
                setAdd(true);
              }}
            />
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => deleteCommission(ledger.id)}
              danger
              loading={isdeleting}
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

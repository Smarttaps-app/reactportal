import { Button, Card, Empty, Flex, Row, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../../utils/Common";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { IBiller, IDiscount, IUser } from "../../../../utils/type";
import AddDiscount from "./AddDiscount";
import {
  useDeleteDiscount,
  useDiscounts,
} from "../../../../hooks/useAccounting";

export default function DiscountsScreen() {
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState<IDiscount>();
  const { loading, discounts, error } = useDiscounts();
  const { deleteDiscount, isdeleting } = useDeleteDiscount();

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "5%",
      },
      {
        title: "Provider Name",
        dataIndex: "admin",
        key: "admin",
        width: "20%",
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
        width: "20%",
        render: (biller: IBiller) => (
          <span className="text-xs text-gray-500">{biller?.billerName}</span>
        ),
      },
      {
        title: "provider discount rate",
        dataIndex: "provider_discount_rate",
        key: "provider_discount_rate",
        width: "20%",
      },
      {
        title: "Mode",
        dataIndex: "provider_discount_type",
        key: "provider_discount_type",
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
        render: (key: string, ledger: IDiscount) => (
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
              onClick={() => deleteDiscount(ledger.id)}
              danger
              loading={isdeleting}
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

  const data: IDiscount[] = discounts || [];

  return (
    <>
      <Card
        title="Provider Discount"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <Button
              icon={<PlusOutlined />}
              title="New Discount"
              type="primary"
              onClick={() => {
                setItem(undefined);
                setAdd(true);
              }}
            >
              New Provider Discount
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
      <AddDiscount payload={item} isOpen={add} onCancel={() => setAdd(false)} />
    </>
  );
}

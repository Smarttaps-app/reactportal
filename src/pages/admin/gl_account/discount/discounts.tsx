import {
  App,
  Button,
  Card,
  Empty,
  Flex,
  Input,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../../utils/Common";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { IBiller, IDiscount, IUser } from "../../../../utils/type";
import AddDiscount from "./AddDiscount";
import { useDeleteDiscount, useDiscounts } from "../useAccounting";
import { Search } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function DiscountsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [add, setAdd] = useState(false);
  const { message } = App.useApp();
  const client = useQueryClient();
  const [item, setItem] = useState<IDiscount>();
  const { loading, discounts, error } = useDiscounts();
  const { deleteDiscount, isdeleting } = useDeleteDiscount();

  const columns = useMemo(
    () => [
      {
        title: "GL",
        dataIndex: "gl_to_provider",
        key: "gl_to_provider",
        width: "5%",
      },
      {
        title: "Provider",
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
        width: "10%",
        render: (biller: IBiller) => (
          <span className="text-xs text-gray-500">{biller?.billerName}</span>
        ),
      },
      {
        title: "rate",
        dataIndex: "provider_discount_rate",
        key: "provider_discount_rate",
        width: "10%",
      },
      {
        title: "Mode",
        dataIndex: "provider_discount_type",
        key: "provider_discount_type",
      },
      {
        title: "Status",
        dataIndex: "active",
        key: "active",
        width: "8%",
        render: (status: boolean) => (
          <Tag color={`${status ? "green" : "red"}`}>
            {status ? "Active" : "Inactive"}
          </Tag>
        ),
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
              onClick={() =>
                deleteDiscount(ledger.id, {
                  onSuccess: (response) =>
                    message.success(response.statusDescription),
                  onError: (error) => message.error(Common.formatError(error)),
                  onSettled: () =>
                    client.invalidateQueries({ queryKey: ["discounts"] }),
                })
              }
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

  const data =
    discounts.filter(
      (discount: IDiscount) =>
        discount.provider_discount_type
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        discount.provider_discount_rate
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <>
      <Card
        title="Provider Discount"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search discount..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-gray-50 border-gray-200 focus-visible:outline-none focus:ring-2 focus:!ring-primary focus:bg-white !ease-linear !duration-200 !transition-all"
              />
            </div>
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

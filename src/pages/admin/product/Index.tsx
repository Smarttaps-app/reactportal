import { Button, Card, Empty, Flex, Row, Space, Table, Tag } from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import {
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { IBiller, IProduct } from "../../../utils/type";
import ProductCard from "./ProductCard";
import { useProducts } from "../../../hooks/useProduct";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

export default function ProductsScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { loading, products, error } = useProducts();

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "5%",
      },
      {
        title: "Product Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Vas Type",
        dataIndex: "vasType",
        key: "vasType",
        width: "10%",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "8%",
        render: (status: boolean) => (
          <Tag color={`${status ? "green" : "red"}`}>
            {status ? "Active" : "Inactive"}
          </Tag>
        ),
      },
      {
        title: "Billers",
        dataIndex: "billers",
        key: "billers",
        width: "8%",
        render: (billers: IBiller[]) => (
          <span className="text-xs text-gray-500">
            {billers?.length > 0
              ? ` ${billers?.length} biller(s)`
              : ` No billers`}
          </span>
        ),
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
        render: (key: string, product: IProduct) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() =>
                navigate(`/admin/product/${product.id}`, {
                  state: {
                    sproduct: product,
                  },
                })
              }
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

  const data: IProduct[] = products || [];

  return (
    <>
      <Row className="pb-8" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
        <ProductCard
          title="All Products"
          sessionKey="all"
          valueKey="all"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <ProductCard
          title="Total Active"
          sessionKey="active"
          valueKey="active"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <ProductCard
          title="Total Failed"
          sessionKey="inactive"
          valueKey="inactive"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
      </Row>
      <Card
        title="Products"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <Button
              icon={<PlusOutlined />}
              title="New Product"
              type="primary"
              onClick={() => setShow(true)}
            >
              New Product
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
        <Product isOpen={show} onCancel={() => setShow(false)} />
      </Card>
    </>
  );
}

import { Button, Card, Col, Empty, Flex, Row, Space, Table, Tag } from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import { EyeOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { IProduct } from "../../../utils/type";
import ProductCard from "./ProductCard";
import { useProducts } from "../../../hooks/useProduct";
import Product from "./Product";

export default function ProductsScreen() {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState<IProduct>();
  const { loading, products, error } = useProducts();

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
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
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: boolean) => (
          <Tag color={`${status ? "green" : "red"}`}>
            {status ? "Active" : "Inactive"}
          </Tag>
        ),
      },
      {
        title: "Channel",
        dataIndex: "channel",
        key: "channel",
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
        render: (key: string, product: IProduct) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                setProduct(product);
                setShow(true);
              }}
            />
            <Button
              type="primary"
              icon={<RedoOutlined />}
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
        <Col span={6}>
          <ProductCard
            title="All Products"
            sessionKey="all"
            valueKey="all"
            loading={loading}
            data={data}
            error={error ? true : false}
          />
        </Col>
        <Col span={6}>
          <ProductCard
            title="Total Active"
            sessionKey="active"
            valueKey="active"
            loading={loading}
            data={data}
            error={error ? true : false}
          />
        </Col>
        <Col span={6}>
          <ProductCard
            title="Total Failed"
            sessionKey="inactive"
            valueKey="inactive"
            loading={loading}
            data={data}
            error={error ? true : false}
          />
        </Col>
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
              //onClick={() => setOpen(true)}
            >
              New Product
            </Button>
          </Space>
        }
      >
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={data}
        />
      </Card>
      <Product
        product={product}
        isOpen={show}
        onCancel={() => setShow(false)}
      />
    </>
  );
}

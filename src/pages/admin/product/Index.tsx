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
import { Common } from "../../../utils/Common";
import { PlusOutlined } from "@ant-design/icons";
import { IBiller, IProduct } from "../../../utils/type";
import ProductCard from "./ProductCard";
import { useProducts } from "../../../hooks/useProduct";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct } from "./useService";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";

export default function ProductsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [item, setItem] = useState<IProduct>();
  const { message } = App.useApp();
  const client = useQueryClient();
  const { isdeleting, deleteProduct } = useDeleteProduct();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
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
        title: "Product Description",
        dataIndex: "description",
        key: "description",
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
        title: "Billers",
        dataIndex: "billers",
        key: "billers",
        render: (billers: IBiller[]) => (
          <span className="text-xs text-gray-500">
            {billers?.length > 0
              ? ` ${billers?.length} biller(s)`
              : ` No billers`}
          </span>
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
        render: (product: IProduct) => (
          <Flex gap="small" wrap>
            <Button
              color="cyan"
              variant="solid"
              size="small"
              onClick={() =>
                navigate(`/admin/product/${product.id}`, {
                  state: {
                    sproduct: product,
                  },
                })
              }
            >
              View
            </Button>
            <Button
              color="default"
              size="small"
              variant="solid"
              onClick={() => {
                setItem(product);
                setShow(true);
              }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              disabled={isdeleting}
              loading={isdeleting}
              onClick={() =>
                deleteProduct(product.id, {
                  onSuccess: (response) =>
                    message.success(response.statusDescription),
                  onError: (error) => message.error(Common.formatError(error)),
                  onSettled: () =>
                    client.invalidateQueries({ queryKey: ["products"] }),
                })
              }
            >
              Delete
            </Button>
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
    products.filter(
      (product: IProduct) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.customerField
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

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
        <AddProduct
          product={item}
          isOpen={show}
          onCancel={() => setShow(false)}
        />
      </Card>
    </>
  );
}

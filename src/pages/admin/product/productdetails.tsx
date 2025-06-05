import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { IBiller, IPackage, IProduct } from "../../../utils/type";
import { useLocation, useNavigate } from "react-router-dom";
import Biller from "./Biller";

export default function ProductDetailScreen() {
  const location = useLocation();
  const { sproduct } = location.state || {};
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "3%",
      },
      {
        title: "Biller Name",
        dataIndex: "billerName",
        key: "billerName",
        width: "9%",
      },
      {
        title: "Biller Type",
        dataIndex: "billerType",
        key: "billerType",
        width: "9%",
      },
      {
        title: "Customer Field",
        dataIndex: "customerField",
        key: "customerField",
        width: "15%",
      },
      {
        title: "Has Package",
        dataIndex: "hasLookup",
        key: "hasLookup",
        width: "10%",
        render: (hasLookup: boolean) => (
          <Tag color={`${hasLookup ? "green" : "red"}`}>
            {hasLookup ? "Yes" : "No"}
          </Tag>
        ),
      },
      {
        title: "Has Addon",
        dataIndex: "hasAddons",
        key: "hasAddons",
        width: "10%",
        render: (hasAddons: boolean) => (
          <Tag color={`${hasAddons ? "green" : "red"}`}>
            {hasAddons ? "Yes" : "No"}
          </Tag>
        ),
      },
      {
        title: "Has Package",
        dataIndex: "hasPackages",
        key: "hasPackages",
        width: "10%",
        render: (hasPackages: boolean) => (
          <Tag color={`${hasPackages ? "green" : "red"}`}>
            {hasPackages ? "Yes" : "No"}
          </Tag>
        ),
      },
      {
        title: "Package",
        dataIndex: "packages",
        key: "packages",
        width: "8%",
        render: (packages: IPackage[]) => (
          <span className="text-xs text-gray-500">
            {packages?.length > 0
              ? ` ${packages?.length} package(s)`
              : ` No package`}
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
        width: "12%",
        render: (key: string, biller: IBiller) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() =>
                navigate(`/admin/biller/${biller.billerId}`, {
                  state: {
                    payload: biller,
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
  const data: IBiller[] = sproduct.billers || [];
  return (
    <>
      <Card
        title={
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              type="link"
              onClick={() => navigate(-1)}
            />
            {`Product ${sproduct?.name}`}
          </Space>
        }
        className="!shadow-sm !rounded-lg"
        extra={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <Button
              icon={<PlusOutlined />}
              title="New Product"
              type="primary"
              onClick={() => setShow(true)}
            >
              New Biller
            </Button>
          </Space>
        }
      >
        <Space direction="vertical" className="w-full">
          <Form
            //form={form}
            layout="vertical"
            //onFinish={onFinish}
            initialValues={{ remember: true }}
            style={{ minWidth: 320 }}
          >
            <Flex justify="space-evenly">
              <Col span={6}>
                <Form.Item<IProduct>
                  name="name"
                  label="Product Name"
                  initialValue={sproduct?.name}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Product Name!",
                    },
                  ]}
                  className="lg"
                >
                  <Input
                    placeholder="Password"
                    defaultValue={sproduct?.name}
                    className="!rounded-md !py-3"
                  />
                </Form.Item>
                <Form.Item<IProduct>
                  name="customerField"
                  label="customer Field"
                  initialValue={sproduct?.customerField}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Confirm Password!",
                    },
                    {
                      min: 5,
                      message: "Password needs a minimum of 6 characters",
                    },
                  ]}
                  className="lg"
                >
                  <Input placeholder="Password" className="!rounded-md !py-3" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item<IProduct>
                  label="Product Type"
                  name="vasType"
                  rules={[
                    { required: true, message: "Please select product!" },
                  ]}
                >
                  <Select
                    defaultValue={sproduct?.vasType}
                    size="large"
                    options={[
                      { value: "airtime", label: "Airtime" },
                      { value: "data", label: "Data" },
                      { value: "cable", label: "Data" },
                      { value: "utility", label: "Utility" },
                      { value: "payment", label: "Payment" },
                      { value: "transport", label: "Transport" },
                    ]}
                  />
                </Form.Item>
                <Form.Item<IProduct>
                  name="name"
                  label="Product Description"
                  initialValue={sproduct?.description}
                  className="lg"
                >
                  <Input.TextArea
                    placeholder="Password"
                    defaultValue={sproduct?.description}
                    className="!rounded-md !py-3"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="status"
                  label="Product Status"
                  initialValue={sproduct?.status}
                  valuePropName="checked"
                >
                  <Switch defaultValue={sproduct?.status} />
                </Form.Item>
                <Form.Item>
                  <Button
                    block
                    type="primary"
                    //loading={loading}
                    //disabled={loading}
                    htmlType="submit"
                    className="!rounded-md !shadow-md !py-5"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Flex>
          </Form>
        </Space>
        <Table
          rowKey="id"
          size="small"
          //loading={loading}
          columns={columns}
          dataSource={data}
        />
      </Card>
      <Biller isOpen={show} onCancel={() => setShow(false)} />
    </>
  );
}

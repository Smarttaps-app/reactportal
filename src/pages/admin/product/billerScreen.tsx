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
import { IBiller, IPackage } from "../../../utils/type";
import { useLocation, useNavigate } from "react-router-dom";

import Package from "./Package";

export default function BillerDetailScreen() {
  const location = useLocation();
  const { payload } = location.state || {};
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "6%",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "20%",
      },
      {
        title: "Package Code",
        dataIndex: "packageCode",
        key: "packageCode",
        width: "15%",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        width: "15%",
        render: (amount: string) => Common.formatAsCurrency(Number(amount)),
      },
      {
        title: "Has Validity",
        dataIndex: "hasValidity",
        key: "hasValidity",
        width: "10%",
        render: (hasValidity: boolean) => (
          <Tag color={`${hasValidity ? "green" : "red"}`}>
            {hasValidity ? "Yes" : "No"}
          </Tag>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "10%",
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
        width: "12%",
        render: (key: string, record: IPackage) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                //setProduct(biller);
                // setShow(true);
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
  const data: IPackage[] = payload.packages || [];
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
            {`Biller ${payload?.billerName}`}
          </Space>
        }
        className="!shadow-sm !rounded-lg"
        extra={
          <Space className="flex items-center">
            <span className="text-sm text-gray-500">Total: {data.length}</span>
            <Button
              icon={<PlusOutlined />}
              title="New Package"
              type="primary"
              onClick={() => setShow(true)}
            >
              New Package
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
                <Form.Item<IBiller>
                  name="billerName"
                  label="Biller Name"
                  initialValue={payload?.name}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Biller Name!",
                    },
                  ]}
                  className="lg"
                >
                  <Input
                    placeholder="Password"
                    defaultValue={payload?.name}
                    className="!rounded-md !py-3"
                  />
                </Form.Item>
                <Form.Item<IBiller>
                  name="customerField"
                  label="customer Field"
                  initialValue={payload?.customerField}
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
                <Form.Item<IBiller>
                  label="Biller Type"
                  name="billerType"
                  rules={[
                    { required: true, message: "Please select product!" },
                  ]}
                >
                  <Select
                    defaultValue={payload?.vasType}
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
                <Form.Item<IBiller>
                  name="name"
                  label="Biller Description"
                  initialValue={payload?.description}
                  className="lg"
                >
                  <Input.TextArea
                    placeholder="Password"
                    defaultValue={payload?.description}
                    className="!rounded-md !py-3"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="status"
                  label="Biller Status"
                  initialValue={payload?.status}
                  valuePropName="checked"
                >
                  <Switch defaultValue={payload?.status} />
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
          scroll={{ x: "max-content" }}
        />
        <Package isOpen={show} onCancel={() => setShow(false)} />
      </Card>
    </>
  );
}

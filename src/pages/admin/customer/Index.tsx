import {
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Flex,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import { EyeOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { ICustomer, IWallet } from "../../../utils/type";
import CustomerCard from "./CustomerCard";
import { useCustomers } from "../../../hooks/useCustomers";
import CustomerScreen from "./Customer";
const { RangePicker } = DatePicker;

export default function CustomersScreen() {
  const [show, setShow] = useState(false);
  const [customer, setCustomer] = useState<ICustomer>();
  const [selectedDates, setSelectedDates] = useState<
    [dayjs.Dayjs, dayjs.Dayjs]
  >([dayjs().subtract(30, "day"), dayjs()]);
  const {
    loading,
    customers,
    error,
    refetch: refetchPayments,
  } = useCustomers(selectedDates);
  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setSelectedDates([dates[0], dates[1]]);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Full Name",
        dataIndex: "firstname",
        key: "firstname",
        render: (firstname: string, record: ICustomer) => (
          <span className="text-xs text-gray-500">
            {firstname} {record.lastname}
          </span>
        ),
      },
      {
        title: "Email Address",
        dataIndex: "email",
        key: "email",
        render: (email: string) => (
          <span className="text-xs text-gray-500">{email}</span>
        ),
      },
      {
        title: "Phone Number",
        dataIndex: "phonenumber",
        key: "phonenumber",
        render: (phonenumber: string) => (
          <span className="text-xs text-gray-500">
            {Common.formatPhoneNumber(phonenumber)}
          </span>
        ),
      },
      {
        title: "Balance",
        dataIndex: "wallet",
        key: "wallet",
        render: (wallet: IWallet) =>
          Common.formatAsCurrency(Number(wallet?.availableBalance)),
      },
      {
        title: "Account Status",
        dataIndex: "account_status",
        key: "account_status",
        render: (account_status: string) => (
          <Tag
            color={`${
              account_status.toLowerCase() === "active" ? "green" : "red"
            }`}
          >
            {account_status}
          </Tag>
        ),
      },
      {
        title: "Account Type",
        dataIndex: "account_type",
        key: "account_type",
      },
      {
        title: "Date Joined",
        dataIndex: "created_at",
        key: "created_at",
        render: (created: string) => Common.formatDate(created),
        ellipsis: true,
      },
      {
        title: "Actions",
        dataIndex: "",
        render: (key: string, customer: ICustomer) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                setCustomer(customer);
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

  const data: ICustomer[] = customers || [];

  return (
    <>
      <Row className="pb-8" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
        <Col span={6}>
          <CustomerCard
            title="All Customers"
            valueKey="all"
            sessionKey="all"
            loading={loading}
            data={data}
            error={error ? true : false}
          />
        </Col>
        <Col span={6}>
          <CustomerCard
            title="Active"
            valueKey="account_status"
            sessionKey="active"
            loading={loading}
            data={data}
            error={error ? true : false}
          />
        </Col>
        <Col span={6}>
          <CustomerCard
            title="Individual"
            valueKey="account_type"
            sessionKey="individual"
            loading={loading}
            data={data}
            error={error ? true : false}
          />
        </Col>
        <Col span={6}>
          <CustomerCard
            title="Merchant"
            valueKey="account_type"
            sessionKey="merchant"
            loading={loading}
            data={data}
            error={error ? true : false}
          />
        </Col>
      </Row>
      <Card
        title="Payments"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space>
            <RangePicker onChange={handleDateChange} />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => refetchPayments()}
              htmlType="submit"
              loading={loading}
              disabled={loading}
            ></Button>
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
      <CustomerScreen
        customer={customer}
        isOpen={show}
        onCancel={() => setShow(false)}
      />
    </>
  );
}

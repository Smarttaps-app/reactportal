import { Button, Card, DatePicker, Input, Row, Space, Table, Tag } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import { SearchOutlined } from "@ant-design/icons";
import { ICustomer, IWallet } from "../../../utils/type";
import CustomerCard from "./CustomerCard";
import { useCustomers } from "./useCustomers";
import CustomerScreen from "./Customer";
import { Search } from "lucide-react";
const { RangePicker } = DatePicker;

export default function CustomersScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [customer, setCustomer] = useState<ICustomer>();
  const [selectedDates, setSelectedDates] =
    useState<[dayjs.Dayjs, dayjs.Dayjs]>();
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
          <Button
            color="cyan"
            variant="filled"
            onClick={() => {
              setCustomer(customer);
              setShow(true);
            }}
          >
            view
          </Button>
        ),
      },
    ],
    [],
  );
  const data =
    customers?.filter(
      (customer: ICustomer) =>
        customer?.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer?.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer?.phonenumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        customer?.account_type
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        customer?.email.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  return (
    <>
      <Row className="pb-8" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
        <CustomerCard
          title="All Customers"
          valueKey="all"
          sessionKey="all"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <CustomerCard
          title="Active"
          valueKey="account_status"
          sessionKey="active"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <CustomerCard
          title="Individual"
          valueKey="account_type"
          sessionKey="individual"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <CustomerCard
          title="Merchant"
          valueKey="account_type"
          sessionKey="merchant"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
      </Row>
      <Card
        title="Payments"
        className="!shadow-sm !rounded-lg"
        loading={loading}
        extra={
          <Space>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-gray-50 border-gray-200 focus-visible:outline-none focus:ring-2 focus:!ring-primary focus:bg-white !ease-linear !duration-200 !transition-all"
              />
            </div>
            <RangePicker onChange={handleDateChange} />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => refetchPayments()}
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              Search
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
      <CustomerScreen
        customer={customer}
        isOpen={show}
        onCancel={() => setShow(false)}
      />
    </>
  );
}

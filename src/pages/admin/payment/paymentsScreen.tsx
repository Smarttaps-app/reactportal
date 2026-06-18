import {
  Button,
  Card,
  DatePicker,
  Input,
  Result,
  Space,
  Table,
  Tag,
} from "antd";
import { usePayments } from "../../../hooks/usePayments";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import { SearchOutlined } from "@ant-design/icons";
import { IPayment } from "../../../utils/type";
import PaymentCard from "./PaymentCard";
import ShowPayment from "./ShowPayment";
import { Search } from "lucide-react";
const { RangePicker } = DatePicker;

export default function PaymentsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [payment, setPayment] = useState<IPayment>();
  const [selectedDates, setSelectedDates] =
    useState<[dayjs.Dayjs, dayjs.Dayjs]>();
  const {
    loading,
    payments,
    error,
    refetch: refetchPayments,
  } = usePayments(selectedDates);
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
        title: "Wallet",
        dataIndex: "recipient",
        key: "recipient",
      },
      {
        title: "Product",
        dataIndex: "product",
        key: "product",
      },
      {
        title: "Service",
        dataIndex: "service",
        key: "service",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount: string) => Common.formatAsCurrency(Number(amount)),
      },
      {
        title: "Payment",
        dataIndex: "payment_type",
        key: "payment_type",
        render: (payment_type: string) => (
          <Tag
            color={`${
              payment_type?.toLowerCase() === "credit" ? "green" : "red"
            }`}
          >
            {payment_type}
          </Tag>
        ),
      },
      {
        title: "Channel",
        dataIndex: "channel",
        key: "channel",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string) => (
          <Tag color={Common.paymentStatusColor(status)}>{status}</Tag>
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
        render: (_key: string, payment: IPayment) => (
          <Button
            type="primary"
            color="green"
            size="small"
            variant="filled"
            onClick={() => {
              setPayment(payment);
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
    payments.filter((payment: IPayment) => {
      const q = searchTerm.toLowerCase();
      return (
        payment.recipient?.toLowerCase().includes(q) ||
        payment.payment_type?.toLowerCase().includes(q) ||
        payment.product?.toLowerCase().includes(q) ||
        payment.service?.toLowerCase().includes(q) ||
        payment.channel?.toLowerCase().includes(q)
      );
    }) || [];

  return (
    <>
      <div className="pb-8 grid grid-flow-col md:grid-flow-col gap-2">
        <PaymentCard
          title="Total Credits"
          sessionKey="credit"
          loading={loading}
          data={data}
          error={error ? true : false}
          color="green"
        />
        <PaymentCard
          title="Total Debit"
          sessionKey="debit"
          loading={loading}
          data={data}
          error={error ? true : false}
          color="red"
        />
        <PaymentCard
          title="Total Failed"
          sessionKey="failed"
          loading={loading}
          data={data}
          error={error ? true : false}
          color="purple"
        />
        <PaymentCard
          title="Total Pending"
          sessionKey="pending"
          loading={loading}
          data={data}
          error={error ? true : false}
          color="yellow"
        />
      </div>
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
          loading={loading}
          columns={columns}
          dataSource={data}
          locale={{
            emptyText: error ? (
              <Result status="error" subTitle={Common.formatError(error)} />
            ) : (
              "No data available"
            ),
          }}
          scroll={{ x: "max-content" }}
        />
      </Card>
      <ShowPayment
        payment={payment}
        isOpen={show}
        onCancel={() => setShow(false)}
      />
    </>
  );
}

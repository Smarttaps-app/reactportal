import {
  Button,
  Card,
  DatePicker,
  Empty,
  Input,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Search } from "lucide-react";
import { IRevenue } from "../../../../utils/type";
import { Common } from "../../../../utils/Common";
import PaymentCard from "../../payment/PaymentCard";
import { useRevenue } from "../useAccounting";
const { RangePicker } = DatePicker;

export default function RevenuesScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDates, setSelectedDates] =
    useState<[dayjs.Dayjs, dayjs.Dayjs]>();
  const {
    loading,
    payments,
    error,
    refetch: refetchPayments,
  } = useRevenue(selectedDates);
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
        title: "Customer",
        dataIndex: "",
        key: "firstname",
        render: (reve: IRevenue) => (
          <span className="text-xs text-gray-500">
            {reve.lastname} {reve.firstname}
          </span>
        ),
      },
      {
        title: "Recipient",
        dataIndex: "recipient",
        key: "recipient",
      },
      {
        title: "Product",
        dataIndex: "productName",
        key: "productName",
      },
      {
        title: "Service",
        dataIndex: "billerName",
        key: "billerName",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount: string) => Common.formatAsCurrency(Number(amount)),
      },
      {
        title: "Service Amount",
        dataIndex: "providerAmount",
        key: "providerAmount",
        render: (providerAmount: string) =>
          Common.formatAsCurrency(Number(providerAmount)),
      },
      {
        title: "Com Amount",
        dataIndex: "commissionAmount",
        key: "commissionAmount",
        render: (commissionAmount: string) =>
          Common.formatAsCurrency(Number(commissionAmount)),
      },
      {
        title: "Payment",
        dataIndex: "payment_type",
        key: "payment_type",
        render: (payment_type: string) => (
          <Tag
            color={`${
              payment_type.toLowerCase() === "credit" ? "green" : "red"
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
        title: "TrnxRef",
        dataIndex: "reference",
        key: "reference",
      },
      {
        title: "Message",
        dataIndex: "statusMessage",
        key: "statusMessage",
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
    payments.filter(
      (payment: IRevenue) =>
        payment.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.payment_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.channel.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  return (
    <>
      <div className="pb-8 grid grid-flow-col md:grid-flow-col gap-2">
        <PaymentCard
          title="Total Revenue"
          sessionKey="debit"
          loading={loading}
          data={data}
          error={error ? true : false}
          color="green"
        />
        <PaymentCard
          title="Bus"
          sessionKey="debit"
          loading={loading}
          data={data}
          error={error ? true : false}
          color="blue"
        />
        <PaymentCard
          title="Train"
          sessionKey="debit"
          loading={loading}
          data={data}
          error={error ? true : false}
          color="pink"
        />
        <PaymentCard
          title="NFC"
          sessionKey="debit"
          loading={loading}
          data={data}
          error={error ? true : false}
          color="yellow"
        />
        <PaymentCard
          title="Others"
          sessionKey="debit"
          loading={loading}
          data={data}
          error={error ? true : false}
          color="blue"
        />
      </div>
      <Card
        title="Payments"
        className=" !rounded-lg"
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
          scroll={{ x: "max-content" }}
        />
      </Card>
    </>
  );
}

import {
  Button,
  Card,
  DatePicker,
  Empty,
  Flex,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import { usePayments } from "../../../hooks/usePayments";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import { EyeOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { IPayment } from "../../../utils/type";
import PaymentCard from "./PaymentCard";
import ShowPayment from "./ShowPayment";
const { RangePicker } = DatePicker;

export default function JournalEntriesScreen() {
  const [show, setShow] = useState(false);
  const [payment, setPayment] = useState<IPayment>();
  const [selectedDates, setSelectedDates] = useState<
    [dayjs.Dayjs, dayjs.Dayjs]
  >([dayjs().subtract(30, "day"), dayjs()]);
  const {
    loading,
    payments,
    error,
    refetch: refetchPayments,
  } = usePayments(selectedDates);
  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null] | null
    // dateStrings: [string, string]
  ) => {
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
        render: (_key: string, payment: IPayment) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                setPayment(payment);
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

  const data: IPayment[] = payments || [];

  return (
    <>
      <Row className="pb-8" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
        <PaymentCard
          title="Total Credits"
          sessionKey="credit"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <PaymentCard
          title="Total Debit"
          sessionKey="debit"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <PaymentCard
          title="Total Failed"
          sessionKey="failed"
          loading={loading}
          data={data}
          error={error ? true : false}
        />
        <PaymentCard
          title="Total Pending"
          sessionKey="pending"
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
      <ShowPayment
        payment={payment}
        isOpen={show}
        onCancel={() => setShow(false)}
      />
    </>
  );
}

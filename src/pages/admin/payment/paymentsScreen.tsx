import {
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Flex,
  Row,
  Space,
  Spin,
  Statistic,
  Table,
  Tag,
} from "antd";
import { usePayments } from "../../../hooks/usePayments";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import {
  DeleteOutlined,
  EditOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { IPayment } from "../../../utils/type";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;

export default function PaymentsScreen() {
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState<
    [dayjs.Dayjs, dayjs.Dayjs]
  >([dayjs().subtract(30, "day"), dayjs()]);
  const {
    loading,
    payments,
    error,
    refetch: refetchPayments,
  } = usePayments(selectedDates);
  const handleDateChange = (dates: [Dayjs, Dayjs] | null) => {
    if (dates) {
      setSelectedDates(dates);
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
        render: (key: string, data: IPayment) => (
          <Flex gap="small" align="center" wrap>
            <Button
              type="primary"
              icon={<EditOutlined />}
              // onClick={() => showDeleteConfirm(data)}
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
        <Col span={6}>
          <Card className="rounded-lg shadow-lg">
            <Statistic
              title="Total Credit"
              loading={loading}
              value={
                data.length < 0
                  ? Common.formatAsCurrency(0)
                  : Common.formatAsCurrency(
                      Common.sumTotalByKey(data, "amount")
                    )
              }
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="rounded-lg shadow-lg">
            <Statistic
              title="Total Debit"
              className="!bg-orange"
              loading={loading}
              value={
                data.length < 0
                  ? Common.formatAsCurrency(0)
                  : Common.formatAsCurrency(
                      Common.sumTotalByKey(data, "amount")
                    )
              }
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="rounded-lg shadow-lg">
            <Statistic
              title="Total Pending"
              loading={loading}
              value={
                data.length < 0
                  ? Common.formatAsCurrency(0)
                  : Common.formatAsCurrency(
                      Common.sumTotalByKey(data, "amount")
                    )
              }
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
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
    </>
  );
}

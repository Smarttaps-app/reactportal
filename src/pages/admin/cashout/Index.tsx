import {
  Button,
  Card,
  DatePicker,
  Input,
  Result,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { Common } from "../../../utils/Common";
import { SearchOutlined } from "@ant-design/icons";
import { ICashout } from "../../../utils/type";
import CashoutCard from "./CashoutCard";
import { Search } from "lucide-react";
import { useCashouts } from "./useCashout";
const { RangePicker } = DatePicker;

export default function CashoutsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDates, setSelectedDates] = useState<
    [dayjs.Dayjs, dayjs.Dayjs]
  >([dayjs().subtract(30, "day"), dayjs()]);
  const {
    loading,
    cashouts,
    error,
    refetch: refetchPayments,
  } = useCashouts(selectedDates);
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
        title: "Account",
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
        title: "Status",
        dataIndex: "withdrawalStatus",
        key: "withdrawalStatus",
        render: (withdrawalStatus: string) => (
          <Tag color={Common.cashOutStatusColor(withdrawalStatus)}>
            {Common.cashOutStatus(withdrawalStatus)}
          </Tag>
        ),
      },
      {
        title: "Reference",
        dataIndex: "reference",
        key: "reference",
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

  const data =
    cashouts.filter(
      (cashout: ICashout) =>
        cashout.withdrawalStatus
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        cashout.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cashout.message?.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  return (
    <>
      <Row className="pb-8" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
        <CashoutCard
          title="Success"
          sessionKey="completed"
          loading={loading}
          data={data}
          error={error ? true : false}
          color="green"
        />
        <CashoutCard
          title="Pending"
          sessionKey="waiting"
          loading={loading}
          data={data}
          error={error ? true : false}
          color="yellow"
        />
        <CashoutCard
          title="Failed"
          sessionKey="failed"
          loading={loading}
          data={data}
          error={error ? true : false}
          color="gray"
        />
        <CashoutCard
          title="Rejected"
          sessionKey="rejected"
          loading={loading}
          data={data}
          error={error ? true : false}
          color="red"
        />
      </Row>
      <Card
        title="Cashout Histories"
        className="!rounded-sm"
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
    </>
  );
}

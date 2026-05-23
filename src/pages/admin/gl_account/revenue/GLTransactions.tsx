import { useMemo, useState } from "react";
import { useGlTransactions } from "../useAccounting";
import { IGLTransaction } from "../../../../utils/type";
import { Button, Card, Result, Space, DatePicker, Input, Table } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Common } from "../../../../utils/Common";
import dayjs, { Dayjs } from "dayjs";
import { Search } from "lucide-react";
import RevenueCard from "../../../../widgets/RevenueCard";
import JournalEntries from "./entries";
const { RangePicker } = DatePicker;

export default function GLTransactions() {
  const [add, setAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [item, setItem] = useState<IGLTransaction>();
  const [selectedDates, setSelectedDates] = useState<
    [dayjs.Dayjs, dayjs.Dayjs]
  >([dayjs().subtract(30, "day"), dayjs()]);
  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setSelectedDates([dates[0], dates[1]]);
    }
  };
  const { loading, glTransactions, error, refetch } =
    useGlTransactions(selectedDates);

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Reference",
        dataIndex: "reference",
        key: "reference",
      },
      {
        title: "Transaction type",
        dataIndex: "transaction_type",
        key: "transaction_type",
      },
      {
        title: "Amount",
        dataIndex: "total_amount",
        key: "total_amount",
        render: (total_amount: string) =>
          Common.formatAsCurrency(Number(total_amount)),
      },
      {
        title: "Fees",
        dataIndex: "fee_amount",
        key: "fee_amount",
        render: (fee_amount: string) =>
          Common.formatAsCurrency(Number(fee_amount)),
      },
      {
        title: "Provider Cost",
        dataIndex: "provider_cost",
        key: "provider_cost",
        render: (provider_cost: string) =>
          Common.formatAsCurrency(Number(provider_cost)),
      },
      {
        title: "Commission Cost",
        dataIndex: "commission",
        key: "commission",
        render: (commission: string) =>
          Common.formatAsCurrency(Number(commission)),
      },
      {
        title: "Merchant Commission",
        dataIndex: "merchant_comm",
        key: "merchant_comm",
        render: (merchant_comm: string) =>
          Common.formatAsCurrency(Number(merchant_comm)),
      },
      {
        title: "Posted Date",
        dataIndex: "posted_at",
        key: "posted_at",
        render: (posted_at: string) => Common.formatDate(posted_at),
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
        render: (t: IGLTransaction) => (
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => {
              setItem(t);
            }}
          />
        ),
      },
    ],
    [],
  );
  const data: IGLTransaction[] = glTransactions || [];

  return (
    <>
      <div className="pb-8 grid grid-flow-col md:grid-flow-col gap-2">
        <RevenueCard
          title="Total Income"
          sessionKey="total_amount"
          loading={loading}
          data={data}
          color="green"
        />
        <RevenueCard
          title="Total Liabilities"
          sessionKey="provider_cost"
          loading={loading}
          data={data}
          color="red"
        />
        <RevenueCard
          title="Total Revenues"
          sessionKey="commission"
          loading={loading}
          data={data}
          color="blue"
        />
      </div>
      <Card
        title="General Ledger Transactions"
        className="!rounded-sm"
        loading={loading}
        extra={
          <Space>
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
            <RangePicker onChange={handleDateChange} />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => refetch()}
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
      <JournalEntries
        payload={item}
        isOpen={add}
        onCancel={() => setAdd(false)}
      />
    </>
  );
}

import { Typography, Tag, Spin, Button, Table } from "antd";
import { datas, options, useAnalytics } from "./useAnalytics";
import SummaryCard from "../../../widgets/SummaryCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Common } from "../../../utils/Common";
import DailyPaymentsChart from "./DailyBarChart";
import { useMemo } from "react";
import { usePayment10Days } from "../../../hooks/usePayments";
import { useUser } from "../../../context/useUser";
import PaymentsPie from "./PieChart";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Dashboard() {
  const { user } = useUser();
  const { loading, payments } = usePayment10Days();
  const { isPending, data, error } = useAnalytics();
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
        title: "Product",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Channel",
        dataIndex: "channel",
        key: "channel",
      },
      {
        title: "Trxn Id",
        dataIndex: "reference",
        key: "reference",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Trxn Date",
        dataIndex: "updated_at",
        key: "updated_at",
        render: (updated: string) => Common.formatDate(updated),
        ellipsis: true,
      },
    ],
    []
  );
  return (
    <div className="grid gap-2 sm:grid-col-2  md:grid-cols-3 lg:grid-cols-4 p-4">
      <div className="sm:col-span-1 md:col-span-3 lg:col-span-3 grid space-y-4">
        <div className="">
          {isPending && <Spin />}
          {data?.customer && (
            <div className="mx-auto flex-col space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard
                  title="Total Customers"
                  value={error ? 0 : data?.customer?.total_customers}
                  color="bg-white border-blue-600"
                />
                <SummaryCard
                  title="Total Credit"
                  value={
                    error
                      ? "0"
                      : Common.formatAsCurrency(
                          data?.credit?.total_amount
                        ).toString()
                  }
                  children={
                    <Tag color="cyan">
                      {(data?.credit?.total_amount /
                        data?.credit?.total_amount) *
                        100}
                      %
                    </Tag>
                  }
                  color="bg-white border-green-600"
                />
                <SummaryCard
                  title="Total Debit"
                  value={
                    error
                      ? "0"
                      : Common.formatAsCurrency(
                          data?.debit?.total_amount
                        ).toString()
                  }
                  children={
                    <Tag color="cyan">
                      {(data?.debit?.total_amount / data?.debit?.total_amount) *
                        100}
                      %
                    </Tag>
                  }
                  color="bg-white border-red-600"
                />
                {/*<SummaryCard
                        title="Active"
                        value={error ? 0 : data?.debit?.active_customers}
                        color="bg-green-50 border-green-600"
                      />
                      <SummaryCard
                        title="Pending"
                        value={error ? 0 : data?.customer?.reg_customers}
                        color="bg-yellow-50 border-yellow-600"
                      />
                      <SummaryCard
                        title="Inactive"
                        value={error ? 0 : data?.customer?.inactive_customers}
                        color="bg-purple-50 border-purple-600"
                      />
                      <SummaryCard
                        title="Locked"
                        value={error ? 0 : data?.customer?.locked_customers}
                        color="bg-rose-50 border-rose-600"
                      />
                      <SummaryCard
                        title="Blocked"
                        value={error ? 0 : data?.customer?.blocked_customers}
                        color="bg-red-50 border-red-600"
                      /> */}
              </div>
            </div>
          )}
          {/*data?.credit && (
                <div className="mx-auto flex-col space-y-16">
                  <Typography.Title level={4}>Credit Report</Typography.Title>
                  <div className="w-full space-y-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <SummaryCard
                        title="Total Credit"
                        value={
                          error
                            ? "0"
                            : Common.formatAsCurrency(
                                data?.credit?.total_amount
                              ).toString()
                        }
                        children={
                          <Tag color="cyan">
                            {(data?.credit?.total_amount /
                              data?.credit?.total_amount) *
                              100}
                            %
                          </Tag>
                        }
                        color="bg-cyan-50 border-cyan-600"
                      />
                      <SummaryCard
                        title="Successful"
                        value={
                          error
                            ? "0"
                            : Common.formatAsCurrency(
                                data?.credit?.successful_amount
                              ).toString()
                        }
                        children={
                          <Tag color="green">
                            {(
                              (data?.credit?.successful_amount /
                                data?.credit?.total_amount) *
                              100
                            ).toFixed(2)}
                            %
                          </Tag>
                        }
                        color="bg-green-50 border-green-600"
                      />
                      <SummaryCard
                        title="Pending"
                        value={
                          error
                            ? "0"
                            : Common.formatAsCurrency(
                                data?.credit?.pending_amount
                              ).toString()
                        }
                        children={
                          <Tag color="yellow">
                            {(
                              (data?.credit?.pending_amount /
                                data?.credit?.total_amount) *
                              100
                            ).toFixed(2)}
                            %
                          </Tag>
                        }
                        color="bg-yellow-50 border-yellow-600"
                      />
                      <SummaryCard
                        title="Failed"
                        value={
                          error
                            ? "0"
                            : Common.formatAsCurrency(
                                data?.credit?.failed_amount
                              ).toString()
                        }
                        children={
                          <Tag color="red">
                            {(
                              (data?.credit?.failed_amount /
                                data?.credit?.total_amount) *
                              100
                            ).toFixed(2)}
                            %
                          </Tag>
                        }
                        color="bg-red-50 border-red-600"
                      />
                    </div>
                  </div>
                </div>
              )*/}
          {/*data?.debit && (
                <div className="mx-auto flex-col space-y-16">
                  <Typography.Title level={4}>Debit Report</Typography.Title>
                  <div className="w-full space-y-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <SummaryCard
                        title="Total Debit"
                        value={
                          error
                            ? "0"
                            : Common.formatAsCurrency(
                                data?.debit?.total_amount
                              ).toString()
                        }
                        children={
                          <Tag color="cyan">
                            {(data?.debit?.total_amount /
                              data?.debit?.total_amount) *
                              100}
                            %
                          </Tag>
                        }
                        color="bg-cyan-50 border-cyan-600"
                      />
                      <SummaryCard
                        title="Successful"
                        value={
                          error
                            ? "0"
                            : Common.formatAsCurrency(
                                data?.debit?.successful_amount
                              ).toString()
                        }
                        children={
                          <Tag color="green">
                            {(
                              (data?.debit?.successful_amount /
                                data?.debit?.total_amount) *
                              100
                            ).toFixed(2)}
                            %
                          </Tag>
                        }
                        color="bg-green-50 border-green-600"
                      />
                      <SummaryCard
                        title="Pending"
                        value={
                          error
                            ? "0"
                            : Common.formatAsCurrency(
                                data?.debit?.pending_amount
                              ).toString()
                        }
                        children={
                          <Tag color="yellow">
                            {(
                              (data?.debit?.pending_amount /
                                data?.debit?.total_amount) *
                              100
                            ).toFixed(2)}
                            %
                          </Tag>
                        }
                        color="bg-yellow-50 border-yellow-600"
                      />
                      <SummaryCard
                        title="Failed"
                        value={
                          error
                            ? "0"
                            : Common.formatAsCurrency(
                                data?.debit?.failed_amount
                              ).toString()
                        }
                        children={
                          <Tag color="red">
                            {(
                              (data?.debit?.failed_amount /
                                data?.debit?.total_amount) *
                              100
                            ).toFixed(2)}
                            %
                          </Tag>
                        }
                        color="bg-red-50 border-red-600"
                      />
                    </div>
                  </div>
                </div>
              )*/}
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          <div className="p-3 bg-white rounded-md">
            <DailyPaymentsChart payments={payments} />
          </div>
          <div className="p-3 bg-white rounded-md h-84">
            <PaymentsPie payments={payments} />
          </div>
        </div>
        <div className="md:grid-cols-2 bg-white p-4 rounded-lg shadow">
          <Typography.Title level={4} className="font-md">
            Latest Payments
          </Typography.Title>
          <Table
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={payments}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
      <div className="sm:col-span-1 md:col-span-3 lg:col-span-1 space-y-4">
        <div className="mx-auto bg-white rounded-lg text-card-foreground shadow-lg space-y-6">
          <div className="mx-auto rounded-lg text-card-foreground shadow-lg p-4 space-y-6">
            <Typography.Title level={4}>Purse balance</Typography.Title>
            <div className=" space-y-6">
              <div>
                <Typography.Title level={4}>
                  {Common.formatAsCurrency(
                    Number(user?.wallet?.availableBalance ?? 0)
                  )}
                </Typography.Title>
              </div>
              <Button color="primary" variant="solid">
                Cashout
              </Button>
            </div>
          </div>
        </div>
        <Line
          className="p-3 bg-white rounded-md"
          options={options}
          data={datas}
        />
        ;
      </div>
    </div>
  );
}

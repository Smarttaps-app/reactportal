import {
  Typography,
  Tag,
  Spin,
  Button,
  Table,
  Dropdown,
  Space,
  MenuProps,
} from "antd";
import { datas, options } from "./useAnalytics";
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
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import { Common } from "../../../utils/Common";
import DailyPaymentsChart from "./DailyBarChart";
import { useMemo, useState } from "react";
import PaymentsPie from "./PieChart";
import { DownOutlined } from "@ant-design/icons";
import { useBuses, useStations, useTRoutes } from "../transport/bus/useBus";
import { usePayments } from "../../../hooks/usePayments";
import { useCashouts } from "../cashout/useCashout";
import { useTickets } from "../ticket/useTicket";
import CountCard from "../../../widgets/CountCard";
import { INotification, ITicket } from "../../../utils/type";
import { useCustomers } from "../customer/useCustomers";
import { useAdmins } from "../../../hooks/useAdmin";
import { useProducts } from "../product/useService";
import { useTrains } from "../transport/train/useTrain";
import TicketsPie from "./TicketPieChart";
import { useNotifications } from "../../../hooks/useNotification";

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
  const { loading: trying, trains } = useTrains();
  const { loading: bussing, buses } = useBuses();
  const { loading: parking, routes } = useTRoutes();
  const { loading: stationing, stations } = useStations();
  const [range, setRange] = useState("daily");
  const [selectedDates, setSelectedDates] = useState<
    [dayjs.Dayjs, dayjs.Dayjs]
  >([dayjs().subtract(30, "day"), dayjs()]);
  const {
    loading: ticketing,
    error: ticketError,
    tickets,
  } = useTickets(selectedDates);
  const {
    loading: loads,
    error: productError,
    payments,
  } = usePayments(selectedDates);
  const {
    loading: cashing,
    error: cashError,
    cashouts,
  } = useCashouts(selectedDates);
  const { loading: getting, customers } = useCustomers(selectedDates);
  const { isPending, data: admins, error: adminError } = useAdmins("");
  const { loading, products, error } = useProducts();
  const {
    loading: notifying,
    notifications,
    error: notificationError,
  } = useNotifications(selectedDates);

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
  const items: MenuProps["items"] = [
    { label: "Daily", key: "0" },
    { label: "Weekly", key: "1" },
    { label: "Monthly", key: "2" },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "0") {
      setRange("daily");
      setSelectedDates([dayjs().subtract(1, "day"), dayjs()]);
    } else if (e.key === "1") {
      setRange("weekly");
      setSelectedDates([dayjs().subtract(7, "day"), dayjs()]);
    } else if (e.key === "2") {
      setRange("monthly");
      setSelectedDates([dayjs().subtract(30, "day"), dayjs()]);
    }
  };
  return (
    <div className="grid gap-1 items-end">
      <div className="flex justify-between p-4 bg-white rounded-lg shadow">
        <Typography.Text className="font-md">Dashboard</Typography.Text>
        <Dropdown menu={{ items, onClick: handleMenuClick }}>
          <Button>
            <Space>
              {range.charAt(0).toUpperCase() + range.slice(1)}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      <div className="lg:grid gap-2 lg:grid-cols-4 p-4">
        <div className="lg:col-span-3 space-y-4">
          <div className="mx-auto flex-col space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SummaryCard
                title="Total Credit"
                value={
                  error
                    ? "0"
                    : Common.formatAsCurrency(
                        Common.sumByPaymentType(payments, "CREDIT")
                      ).toString()
                }
                children={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right my-2 text-green-600"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                }
                color="bg-white border-green-600"
              />
              <SummaryCard
                title="Total Debit"
                value={
                  error
                    ? "0"
                    : Common.formatAsCurrency(
                        Common.sumByPaymentType(payments, "DEBIT")
                      ).toString()
                }
                children={
                  loading ? (
                    <Spin />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-arrow-down-left-icon lucide-arrow-down-left my-2 text-red-600"
                    >
                      <path d="M17 7 7 17" />
                      <path d="M17 17H7V7" />
                    </svg>
                  )
                }
                color="bg-white border-red-600"
              />
              <SummaryCard
                title="Total Tickets Sales"
                value={
                  ticketError
                    ? "0"
                    : Common.formatAsCurrency(
                        (tickets as ITicket[] | undefined)?.reduce(
                          (a, b) => a + (Number(b.price) || 0),
                          0
                        ) ?? 0
                      ).toString()
                }
                children={
                  ticketing ? (
                    <Spin />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right my-1 text-cyan-600"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  )
                }
                color="bg-white border-cyan-600"
              />
              <SummaryCard
                title="Total Cashout "
                value={
                  cashError
                    ? "0"
                    : Common.formatAsCurrency(
                        Common.sumTotalByKey(cashouts, "amount")
                      ).toString()
                }
                children={
                  cashing ? (
                    <Spin />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right my-1 text-green-600"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  )
                }
                color="bg-white border-green-600"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="p-3 bg-white rounded-md">
              <DailyPaymentsChart payments={payments} />
            </div>
            <div className="p-3 bg-white rounded-md lg:h-64">
              <PaymentsPie payments={payments} />
            </div>
          </div>
          <div className="md:grid-cols-2 bg-white p-4 rounded-lg shadow">
            <Table
              title={() => "Latest Payments"}
              size="small"
              rowKey="id"
              loading={loading}
              columns={columns}
              dataSource={payments}
              pagination={{ pageSize: 20 }}
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>
        <div className="lg:col-span-1 space-y-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <CountCard
              title="Total Customers"
              value={error ? 0 : customers?.length}
              color="bg-white border-blue-600"
              children={getting && <Spin />}
            />
            <CountCard
              title="Total Products"
              value={productError ? 0 : products?.length}
              color="bg-white border-blue-600"
              children={loads && <Spin />}
            />
            <CountCard
              title="Total Buses"
              value={error ? 0 : buses?.length}
              color="bg-white border-yellow-600"
              children={bussing && <Spin />}
            />
            <CountCard
              title="Total Trains"
              value={trying ? 0 : trains?.length}
              color="bg-white border-yellow-600"
              children={trying && <Spin />}
            />
            <CountCard
              title="Total Parks"
              value={error ? 0 : stations?.length}
              color="bg-white border-cyan-600"
              children={stationing && <Spin />}
            />
            <CountCard
              title="Total Routes"
              value={error ? 0 : routes?.length}
              color="bg-white border-cyan-600"
              children={parking && <Spin />}
            />
            <CountCard
              title="Total Ticket"
              value={ticketError ? 0 : tickets?.length}
              color="bg-white border-pink-600"
              children={ticketing && <Spin />}
            />
            <CountCard
              title="Total Admins"
              value={adminError ? 0 : admins?.length}
              color="bg-white border-pink-600"
              children={isPending && <Spin />}
            />
          </div>
          <Line
            className="p-3 bg-white rounded-md"
            options={options}
            data={datas}
          />
          <TicketsPie tickets={tickets} />
          <div className="p-3 bg-white rounded-md h-84">
            <Typography.Title level={4} className="font-md">
              Latest Notifications
            </Typography.Title>
            {notifying ? (
              <Spin />
            ) : notificationError ? (
              <Typography.Text className="text-red-600">
                {Common.formatError(notificationError)}
              </Typography.Text>
            ) : notifications.length === 0 ? (
              <Typography.Text>No notifications found</Typography.Text>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {notifications.map((notification: INotification) => (
                  <div
                    key={notification.id}
                    className="p-2 border-b last:border-0"
                  >
                    <Typography.Text className="font-semibold">
                      {notification.title}
                    </Typography.Text>
                    <br />
                    <Typography.Text className="text-sm">
                      {notification.message}
                    </Typography.Text>
                    <br />
                    <Typography.Text className="text-xs text-gray-500">
                      {Common.formatDate(notification.created_at)}
                    </Typography.Text>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

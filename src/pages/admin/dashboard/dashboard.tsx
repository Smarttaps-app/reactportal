import { Typography, Tag, Spin } from "antd";
import { dataline, datas, options, useAnalytics } from "./useAnalytics";
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
import { Bar, Doughnut, Pie, Line } from "react-chartjs-2";
import { Common } from "../../../utils/Common";

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
  const { isPending, data, error } = useAnalytics();
  console.log(data);
  return (
    <>
      {isPending && <Spin />}
      {data?.customer && (
        <div className="mx-auto flex-col space-y-16">
          <Typography.Title level={4}>Customer Report</Typography.Title>
          <div className="w-full space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <SummaryCard
                title="All Customers"
                value={error ? 0 : data?.customer?.total_customers}
                color="bg-cyan-50 border-cyan-600"
              />
              <SummaryCard
                title="Active"
                value={error ? 0 : data?.customer?.active_customers}
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
              />
            </div>
          </div>
          <div className="w-full space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-5">
              <Doughnut className="!h-54" data={datas} />
              <Pie className="!h-54" data={datas} />
              <Bar className="!w-fit !h-54" options={options} data={datas} />
              <Line
                className="!w-fit !h-54"
                data={dataline}
                options={options}
              />
              ;
            </div>
          </div>
        </div>
      )}
      {data?.credit && (
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
                    {(data?.credit?.total_amount / data?.credit?.total_amount) *
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
          <div className="w-full space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Doughnut className="!h-54" data={datas} />
              <Bar className="!h-54" options={options} data={datas} />;
              <Pie className="!h-54" data={datas} />;
            </div>
          </div>
        </div>
      )}
      {data?.debit && (
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
                    {(data?.debit?.total_amount / data?.debit?.total_amount) *
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
                      (data?.debit?.failed_amount / data?.debit?.total_amount) *
                      100
                    ).toFixed(2)}
                    %
                  </Tag>
                }
                color="bg-red-50 border-red-600"
              />
            </div>
          </div>
          <div className="w-full space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Doughnut className=" !h-54" data={datas} />
              <Bar className="!h-54" options={options} data={datas} />;
              <Pie className="!h-54" data={datas} />;
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useQuery } from "@tanstack/react-query";
import { getAnalyticsAction } from "../../../serviceAction/MenuActions";
import { Common } from "../../../utils/Common";
import { message } from "antd";
import { ChartOptions } from "chart.js";

export function useAnalytics() {
  const { isPending, data, error } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalyticsAction,
    //retry: false,
  });
  if (error) message.error(Common.formatError(error));
  return { isPending, data, error };
}

export const datas = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "#1976d2",
        "#2e7d32",
        "#d32f2f",
        "#f57c00",
        "#7b1fa2",
        "#0059b3",
      ],
      borderRadius: 5,
    },
  ],
};
export const pieoptions: ChartOptions<"pie"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom", // can be "bottom" | "left" | "right"
    },
    title: {
      display: true,
      text: "Payment Distribution",
    },
  },
};
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => [12, 19, 3, 5, 2, 3]),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => [12, 19, 3, 5, 2, 3]),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const dataline = {
  labels,
  datasets: [
    {
      label: "My First Dataset",
      data: labels.map(() => [12, 19, 3, 5, 2, 3]),
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

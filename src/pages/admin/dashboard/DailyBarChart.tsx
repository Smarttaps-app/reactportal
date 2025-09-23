import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { IPayment } from "../../../utils/type";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DailyPaymentsChart({
  payments = [],
  fillMissingDays = true,
}) {
  const formatDateKey = (d) => new Date(d).toLocaleDateString("en-CA"); // YYYY-MM-DD

  // 1) group by day
  const grouped = useMemo(() => {
    const map = new Map();
    payments.forEach((p: IPayment) => {
      const date = new Date(p.created_at);
      if (isNaN(date)) return;
      const key = formatDateKey(date);
      const amt = Number(p.amount) / 100 || 0;
      map.set(key, (map.get(key) || 0) + amt);
    });
    return Array.from(map.entries())
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => (a.date < b.date ? -1 : 1));
  }, [payments]);

  // 2) optionally fill missing days
  const series = useMemo(() => {
    if (!fillMissingDays || grouped.length === 0) return grouped;

    const first = new Date(grouped[0].date);
    const last = new Date(grouped[grouped.length - 1].date);

    const normalize = (d) => {
      const dd = new Date(d);
      dd.setHours(0, 0, 0, 0);
      return dd;
    };

    let cur = normalize(first);
    const end = normalize(last);
    const lookup = new Map(grouped.map((g) => [g.date, g.total]));

    const out = [];
    while (cur <= end) {
      const key = cur.toLocaleDateString("en-CA");
      out.push({ date: key, total: lookup.get(key) || 0 });
      cur.setDate(cur.getDate() + 1);
    }
    return out;
  }, [grouped, fillMissingDays]);

  const labels = series.map((s) => s.date);
  const data = {
    labels,
    datasets: [
      {
        label: "Payments (₦)",
        data: series.map((s) => s.total),
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

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Payments" },
    },
    scales: {
      x: {
        ticks: {
          callback: function (val, index) {
            const d = new Date(labels[index]);
            return d.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            });
          },
        },
      },
      y: { beginAtZero: true },
    },
  };
  return (
    <Bar className="p-3 bg-white rounded-md" options={options} data={data} />
  );
}

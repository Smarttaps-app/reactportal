import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { IPayment } from "../../../utils/type";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function PaymentsPie({ payments = [] }: { payments: IPayment[] }) {
  // Group by name and sum amounts
  const grouped = payments.reduce<Record<string, number>>((acc, curr) => {
    const name = curr.name;
    const amount = Number(curr.amount) || 0;
    acc[name] = (acc[name] || 0) + amount;
    return acc;
  }, {});

  const labels = Object.keys(grouped);
  const amounts = Object.values(grouped);

  const pieData = {
    labels,
    datasets: [
      {
        label: "Payments by Product",
        data: amounts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <Pie
      className="mx-auto p-3 bg-white rounded-md"
      data={pieData}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          title: {
            display: true,
            text: "Payment By Product",
          },
        },
      }}
    />
  );
}

export default PaymentsPie;

import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { ITicket } from "../../../utils/type";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function TicketsPie({ tickets = [] }: { tickets: ITicket[] }) {
  const grouped = tickets.reduce<Record<string, number>>((acc, curr) => {
    const name = curr.status;
    const amount = Number(curr.price) || 0;
    acc[name] = (acc[name] || 0) + amount;
    return acc;
  }, {});

  const labels = Object.keys(grouped);
  const amounts = Object.values(grouped);

  const pieData = {
    labels,
    datasets: [
      {
        label: "Ticket by Status",
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
            text: "Ticket by Status",
          },
        },
      }}
    />
  );
}

export default TicketsPie;

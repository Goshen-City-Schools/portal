import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartWidget({ labels, data1, data2 }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to adapt to the container size

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "2023/2023 First term",
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Male",
        data: data1,
        backgroundColor: "#2750B1",
      },
      {
        label: "Female",
        data: data2,
        backgroundColor: "#97c4fb",
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "680px",
        margin: "auto",
        height: "320px",
      }}
    >
      <Bar options={options} data={data} />
    </div>
  );
}

export default ChartWidget;

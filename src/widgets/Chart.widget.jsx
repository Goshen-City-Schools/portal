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

  //   const labels = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //   ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Female",
        data: data1,
        backgroundColor: "#9440b7",
      },
      {
        label: "Male",
        data: data2,
        backgroundColor: "#10296E",
      },
    ],
  };
  return (
    <>
      <div style={{ width: "680px", margin: "auto auto" }}>
        <Bar options={options} data={data} />
      </div>
    </>
  );
}

export default ChartWidget;

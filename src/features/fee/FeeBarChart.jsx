import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Box } from "@mui/material";

// Register the necessary components for Chart.js
Chart.register(...registerables);

const FeeBarChart = ({ data1, data2 }) => {
  // Combine the data for both datasets by date
  const dates = [
    ...new Set([
      ...data1.map((item) => item.date),
      ...data2.map((item) => item.date),
    ]),
  ];
  dates.sort(); // Assuming date is in a sortable format like YYYY-MM-DD

  const dataset1 = dates.map((date) => {
    const item = data1.find((d) => d.date === date);
    return item ? item.count : 0;
  });

  const dataset2 = dates.map((date) => {
    const item = data2.find((d) => d.date === date);
    return item ? item.count : 0;
  });

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Tuition Fee",
        data: dataset1,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Registration Fee",
        data: dataset2,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box bgcolor={"white"} height={"60vh"} width={"70vw"} >
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default FeeBarChart;

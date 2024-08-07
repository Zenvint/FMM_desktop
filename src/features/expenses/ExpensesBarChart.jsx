import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from "@mui/material";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpensesBarChart = ({data}) => {
    const chartData = {
        labels: data.map((item) => item.date),
        datasets: [
          {
            label: "Total Expenses per day",
            data: data.map((item) => item.count),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
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
        <Box bgcolor={"white"} width={"70vw"}>
          <Bar data={chartData} options={options} />
        </Box>
      );
}

export default ExpensesBarChart
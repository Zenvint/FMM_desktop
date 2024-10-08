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

const SalariesBarChart = ({data}) => {
    const chartData = {
        labels: data.map((item) => item.date),
        datasets: [
          {
            label: "Total Salaries per day",
            data: data.map((item) => item.count),
            backgroundColor: "#70d8bd",
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
        <Box bgcolor={"none"} height={"50vh"} width={"70vw"}>
          <Bar data={chartData} options={options} />
        </Box>
      );
}

export default SalariesBarChart
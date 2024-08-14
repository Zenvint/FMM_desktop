import React from "react";
import { Bar } from "react-chartjs-2";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, colors } from "@mui/material";
import { Margin } from "@mui/icons-material";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentsBarChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Number of Students Enrollment per day",
        data: data.map((item) => item.count),
        backgroundColor: "#70d8bd",
        Margin: 1,
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
    <Box  height={"40vh"} width={"39vw"} marginTop={"30px"} >
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default StudentsBarChart;

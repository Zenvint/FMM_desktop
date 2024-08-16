import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Box } from '@mui/material';

// Register the necessary components for Chart.js
Chart.register(...registerables);

const StudentsPieChart = ({data}) => {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          },
          title: {
            display: true,
            text: 'Students by Section'
          }
        }
      };
    
      return (
        <Box bgcolor={"none"} height={"40vh"} width={"35vw"} display={"grid"} justifyItems={"start"} marginLeft={"30px"} >
            <Pie data={data} options={options} />
        </Box>
      );
}

export default StudentsPieChart
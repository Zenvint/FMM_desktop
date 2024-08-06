import { Box } from "@mui/material";
import React from "react";
import Header from "../../components/Header.jsx";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";
import { AddBtn } from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
    const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleTransaction = () => {
    navigate("/dash/stats/transaction")
  }

  const handleExpense = () => {
    navigate("/dash/stats/expenses")
  }

  const handleStudents = () => {
    navigate("/dash/stats/students")
  }

  const handleFees = () => {
    navigate("/dash/stats/fees")
  }

  const handleSalaries = () => {
    navigate("/dash/stats/salaries")
  }

  return (
    <Box padding={"20px"}>
      <Header title={"Statistics"} subtitle={"System Statistics"} />
      <Box
        padding={"10px"}
        width={"78vw"}
        height={"83vh"}
        bgcolor={colors.primary[400]}
        display={"flex"}
        gap={"10px"}
      >
        <Box>
          <Box
            width={"13vw"}
            borderRadius={"10px"}
            border={`solid 2px ${colors.greenAccent[400]}`}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            padding={"20px 0px" }
            gap={"10px"}
          >
            <AddBtn btnName={"Transaction"} handleEdit={handleTransaction}/>
            <AddBtn btnName={"Expenses"} handleEdit={handleExpense} />
            <AddBtn btnName={"Students"} handleEdit={handleStudents} />
            <AddBtn btnName={"Student Finance"} handleEdit={handleFees} />
            <AddBtn btnName={"Salaries"} handleEdit={handleSalaries} />
          </Box>
          <Box>

          </Box>
        </Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default Statistics;

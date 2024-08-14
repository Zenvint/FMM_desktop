import { Box } from "@mui/material";
import React from "react";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header.jsx";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useGetExpensesQuery } from "../expenses/expensesApiSlice.js";
import PulseLoader from "react-spinners/PulseLoader.js";
import TransactionStatsTile from "../transactions/TransactionStatsTile.jsx";
import ExpensesBarChart from "../expenses/ExpensesBarChart.jsx";

const ExpensesStats = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: expenses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetExpensesQuery("expensesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const countByDate = (expenses) => {
    const counts = {};
    expenses.forEach((expense) => {
      const date = expense.createdOn;
      if (counts[date]) {
        counts[date] += expense.amount;
      } else {
        counts[date] = expense.amount;
      }
    });

    return Object.keys(counts).map((date) => ({ date, count: counts[date] }));
  };

  let content;
  if (isLoading) {
    content = <PulseLoader color={"#FFF"} />;
  }

  if (isError) {
    content = (
      <Box m="0 0 0" display={"grid"} justifyItems={"center"}>
        <p className="errmsg">{error?.data?.message}</p>
      </Box>
    );
  }

  if (isSuccess) {
    const { ids } = expenses;
    const expensesData =
      ids?.length && ids.map((expenseId) => expenses?.entities[expenseId]);

    // getting the total amount spent on expenses
    let totalexpenses = 0;
    expensesData.forEach((expense) => {
      totalexpenses += expense.amount;
    });

    // getting the count of expenses by data
    const data = countByDate(expensesData);

    content = (
      <>
        <Box display={"flex"} gap={"5vw"}>
          <TransactionStatsTile
            legendtitle={"Total Amount"}
            title={"Expenses"}
            number={totalexpenses}
          />
        </Box>
        <ExpensesBarChart data={data} />
      </>
    );
  }

  return (
    <Box padding={"20px"}>
      <Header title={"Statistics"} subtitle={"Expenses Statistics"} />

      <Box
        padding={"10px"}
        height={"80vh"}
        bgcolor={colors.primary[400]}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Link to={"/dash/stats"} style={{ color: colors.grey[100] }}>
            <ArrowBackOutlinedIcon className="li_icon" />
          </Link>
          <Box display={"flex"}></Box>
        </Box>

        <Box
          height={"77vh"}
          overflow={"auto"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"5vh"}
        >
          {content}
        </Box>
      </Box>
    </Box>
  );
};

export default ExpensesStats;

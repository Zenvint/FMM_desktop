import { Box } from "@mui/material";
import React from "react";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header.jsx";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useGetSalariesQuery } from "../salary/salaryApiSlice.js";
import { useGetTransactionsQuery } from "../transactions/transactionApiSlice.js";
import PulseLoader from "react-spinners/PulseLoader.js";
import TransactionStatsTile from "../transactions/TransactionStatsTile.jsx";
import TRANSACTIONTYPE from "../../configs/transactiontype.js";
import SalariesBarChart from "../salary/SalariesBarChart.jsx";

const SalaryStats = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: salaries,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSalariesQuery("salariesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: transactions,
    isLoading: isTransLoading,
    isSuccess: isTransSuccess,
    isError: isTransError,
    error: errorTrans,
  } = useGetTransactionsQuery("transactionsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const countByDate = (transactions) => {
    const counts = {};
    transactions.forEach((transaction) => {
      const date = transaction.createdOn;
      if (counts[date]) {
        counts[date] += transaction.amount;
      } else {
        counts[date] = transaction.amount;
      }
    });

    return Object.keys(counts).map((date) => ({ date, count: counts[date] }));
  };

  let content;
  if (isLoading || isTransLoading) {
    content = <PulseLoader color={"#FFF"} />;
  }

  if (isError || isTransError) {
    content = (
      <Box m="0 0 0" display={"grid"} justifyItems={"center"}>
        <p className="errmsg">
          {error?.data?.message || errorTrans?.data?.message}
        </p>
      </Box>
    );
  }

  if (isSuccess && isTransSuccess) {
    const { ids } = salaries;
    const salariesData =
      ids?.length && ids.map((salaryId) => salaries?.entities[salaryId]);

    const { ids: transIds } = transactions;
    const transactionsData =
      transIds?.length &&
      transIds.map((transactionId) => transactions?.entities[transactionId]);

    // filtering salaries transactions from the list of transactions
    const salariesTransactionsData = transactionsData.filter(
      (transaction) => transaction.transactiontype === TRANSACTIONTYPE.Salary
    );

    // getting chart data
    const data = countByDate(salariesTransactionsData)

    // filtering salaries paid
    const salariesPaidData = salariesData.filter((salary) => salary.status);

    // getting the total monthly salaries
    let expectedsalaries = 0;
    salariesData.forEach((salary) => {
      expectedsalaries += salary.salary;
    });

    let paidsalaries = 0;
    salariesPaidData.forEach((salary) => {
      paidsalaries += salary.salary;
    });

    content = (
      <>
        <Box display={"flex"} gap={"5vw"}>
          <TransactionStatsTile
            legendtitle={"Total Monthly Salaries"}
            title={"Expected"}
            number={expectedsalaries}
          />
          <TransactionStatsTile
            legendtitle={"Total Monthly Salaries"}
            title={"Paid"}
            number={paidsalaries}
          />
        </Box>
        <SalariesBarChart data={data} />
      </>
    );
  }

  return (
    <Box padding={"20px"}>
      <Header title={"Statistics"} subtitle={"Salary Statistics"} />

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

export default SalaryStats;

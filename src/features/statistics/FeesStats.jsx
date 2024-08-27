import { Box } from "@mui/material";
import React from "react";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header.jsx";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useGetFeesQuery } from "../fee/feesApiSlice.js";
import { useGetTransactionsQuery } from "../transactions/transactionApiSlice.js";
import PulseLoader from "react-spinners/PulseLoader.js";
import TRANSACTIONTYPE from "../../configs/transactiontype.js";
import TransactionStatsTile from "../transactions/TransactionStatsTile.jsx";
import FeeBarChart from "../fee/FeeBarChart.jsx";

const FeesStats = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: fees,
    isLoading: isFeesLoading,
    isSuccess: isFeeSuccess,
    isError: isFeesError,
    error: errorFee,
  } = useGetFeesQuery("feesList", {
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
  if (isFeesLoading || isTransLoading) {
    content = <PulseLoader color={"#FFF"} />;
  }

  if (isFeesError || isTransError) {
    content = (
      <Box m="0 0 0" display={"grid"} justifyItems={"center"}>
        <p className="errmsg">
          {errorFee?.data?.message || errorTrans?.data?.message}
        </p>
      </Box>
    );
  }

  if (isFeeSuccess && isTransSuccess) {
    const { ids } = transactions;
    const transactionsData =
      ids?.length &&
      ids.map((transactionId) => transactions?.entities[transactionId]);

      const { ids: feesIds } = fees;
      const feesData =
      feesIds?.length && feesIds.map((feeId) => fees?.entities[feeId]);
    // filtering fee transactions from the list of transactions
    const feeTransactionsData = transactionsData.filter(
      (transaction) => transaction.transactiontype === TRANSACTIONTYPE.Tuition
    );
    // getting the total amount  that all fee transactions sum up to
    let totalfeetransaction = 0;
    feeTransactionsData.forEach((transaction) => {
      totalfeetransaction += transaction.amount;
    });
    // filtering registration transactions from the list of transactions
    const registrationTransactionsData = transactionsData.filter(
      (transaction) =>
        transaction.transactiontype === TRANSACTIONTYPE.Registration
    );
    // getting the total amount  that all registration transactions sum up to
    let totalregistrationTrans  = 0;
    registrationTransactionsData.forEach((transaction) => {
      totalregistrationTrans += transaction.amount;
    });

    // getting expected fee for this year and fee recieved this year
    let expectedfee = 0;
    let feerecieved = 0;
    feesData.forEach((fee) => {
      expectedfee += fee.tuition;
      feerecieved += fee.amountPaid;
    })

    // data for the bar chart
    const countfeeData = countByDate(feeTransactionsData)
    const countregistration = countByDate(registrationTransactionsData)


    content = (
      <>
        <Box display={"flex"} gap={"3vw"}>
          <TransactionStatsTile
            legendtitle={"Total Transactions"}
            title={"Tuition Fees"}
            number={totalfeetransaction}
          />
          <TransactionStatsTile
            legendtitle={"Total Fee This Year"}
            title={"Expected Tuition"}
            number={expectedfee}
          />
          <TransactionStatsTile
            legendtitle={"Total Fee This Year"}
            title={"Recieved"}
            number={feerecieved}
          />
          <TransactionStatsTile
            legendtitle={"Total Transactions"}
            title={"Registration Fees"}
            number={totalregistrationTrans}
          />

        </Box>
        <Box backgroundColor={colors.primary[400]} height={"60vh"}>
          <FeeBarChart data1={countfeeData} data2={countregistration} />
        </Box>
      </>
    );
  }

  return (
    <Box padding={"20px"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Header title={"Statistics"} subtitle={"Student Finance Statistics"} />
        <Link to={"/dash/stats"} style={{ color: colors.grey[100] }}>
            <ArrowBackOutlinedIcon className="li_icon" />
        </Link>
      </Box>

      <Box
        padding={"10px"}
        height={"70vh"}
      >
        <Box
          height={"77vh"}
          overflow={"auto"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"start"}
          gap={"5vh"}
        >
          {content}
        </Box>
      </Box>
    </Box>
  );
};

export default FeesStats;

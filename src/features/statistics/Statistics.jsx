import { Box } from "@mui/material";
import React from "react";
import Header from "../../components/Header.jsx";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";
import { AddBtn } from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useGetStudentsQuery } from "../students/studentsApiSlice.js";
import { useGetTransactionsQuery } from "../transactions/transactionApiSlice.js";
import PulseLoader from "react-spinners/PulseLoader.js";
import StudentStatsTile from "../students/StudentStatsTile.jsx";
import StudentsBarChart from "../students/StudentsBarChart.jsx";
import TRANSACTIONTYPE from "../../configs/transactiontype.js";
import TransactionStatsTile from "../transactions/TransactionStatsTile.jsx";

const Statistics = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleExpense = () => {
    navigate("/dash/stats/expenses");
  };

  const handleStudents = () => {
    navigate("/dash/stats/students");
  };

  const handleFees = () => {
    navigate("/dash/stats/fees");
  };

  const handleSalaries = () => {
    navigate("/dash/stats/salaries");
  };

  const countStudentsByDate = (students) => {
    const counts = {};

    students.forEach((student) => {
      const date = student.createdOn;
      if (counts[date]) {
        counts[date]++;
      } else {
        counts[date] = 1;
      }
    });

    return Object.keys(counts).map((date) => ({ date, count: counts[date] }));
  };

  const {
    data: students,
    isLoading: isStudLoading,
    isSuccess: isStudSuccess,
    isError: isStudError,
    error: errorStud,
  } = useGetStudentsQuery("studentsList", {
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

  let content;
  if (isStudLoading || isTransLoading) {
    content = <PulseLoader color={"#FFF"} />;
  }

  if (isStudError || isTransError) {
    content = (
      <Box m="0 0 0" display={"grid"} justifyItems={"center"}>
        <p className="errmsg">
          {errorStud?.data?.message || errorTrans?.data?.message}
        </p>
      </Box>
    );
  }

  if (isStudSuccess && isTransSuccess) {
    const { ids: transIds } = transactions;
    const transactionsData =
      transIds?.length &&
      transIds.map((transactionId) => transactions?.entities[transactionId]);

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
    let totalregistrationTrans = 0;
    registrationTransactionsData.forEach((transaction) => {
      totalregistrationTrans += transaction.amount;
    });

    const { ids: studIds } = students;
    const studentsData =
      studIds?.length &&
      studIds.map((studentId) => students?.entities[studentId]);
    const activeStudents = studentsData.filter((student) => !student.dismissed);

    // data for the general chart for students enrolled every day
    const studChartdata = countStudentsByDate(studentsData);

    content = (
      <>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"5vh"}
        >
          <Box
            width={"13vw"}
            borderRadius={"10px"}
            border={`solid 2px ${colors.greenAccent[400]}`}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            padding={"20px 0px"}
            gap={"10px"}
          >
            <AddBtn btnName={"Students"} handleEdit={handleStudents} />
            <AddBtn btnName={"Student Finance"} handleEdit={handleFees} />
            <AddBtn btnName={"Expenses"} handleEdit={handleExpense} />
            <AddBtn btnName={"Salaries"} handleEdit={handleSalaries} />
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={"5vh"} >
            <StudentStatsTile
              legendtitle={"Total Number of Students"}
              title={"School"}
              number={activeStudents?.length ? activeStudents.length : 0}
            />
            <TransactionStatsTile
              legendtitle={"Total Transactions"}
              title={"Fee"}
              number={totalfeetransaction}
            />
            <TransactionStatsTile
              legendtitle={"Total Transactions"}
              title={"Registration"}
              number={totalregistrationTrans}
            />
          </Box>
        </Box>
        <Box width={"60vw"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
          <StudentsBarChart data={studChartdata} />
        </Box>
      </>
    );
  }

  return (
    <Box padding={"20px"}>
      <Header title={"Statistics"} subtitle={"System Statistics"} />
      <Box
        padding={"10px"}
        height={"80vh"}
        bgcolor={colors.primary[400]}
        display={"flex"}
        gap={"2vw"}
      >
        {content}
      </Box>
    </Box>
  );
};

export default Statistics;

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

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleExpense = () => {
    navigate("/dash/finance/expenses/new");
  };

  const handleStudents = () => {
    navigate("/dash/students/new");
  };

  const handleFees = () => {
    navigate("/dash/finance/fees");
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
    error: errorStud
  } = useGetStudentsQuery("studentsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  const {
    data: transactions,
    isLoading: isTransLoading,
    isSuccess: isTransSuccess,
    isError: isTransError,
    error: errorTrans
  } = useGetTransactionsQuery("transactionsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
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
          gap={"2rem"}
          margin={"2rem 0 0 0"}
          padding={"0 2rem 0 0"}
        >
          <Box display={"flex"} flexDirection={"row"} gap={"3rem"} >
            <StudentStatsTile
              legendtitle={"Total Number of Students:"}
              title={"School"}
              number={activeStudents?.length ? activeStudents.length : 0}
            />
            <TransactionStatsTile
              legendtitle={"Total Transactions:"}
              title={"Fee"}
              number={totalfeetransaction}
            />
            <TransactionStatsTile
              legendtitle={"Total Transactions:"}
              title={"Registration"}
              number={totalregistrationTrans}
            />
          </Box>

          <Box display={"flex"} flexDirection={"row"} gap={"4.5rem"}>
            <Box
              width={"39vw"}
              height={"45vh"}
              padding={"15px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              bgcolor={colors.primary[400]}
            >
              <StudentsBarChart data={studChartdata} />
            </Box>

            <Box
            width={"13vw"}
            borderRadius={"5px"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"end"}
            alignItems={"start"}
            padding={"2px"}
            gap={"15px"}
          >
            <AddBtn btnName={"+ Add Student"} handleEdit={handleStudents} />
            <AddBtn btnName={"Student Finance"} handleEdit={handleFees} />
            <AddBtn btnName={"+ Add Expense"} handleEdit={handleExpense} />
          </Box>


          </Box>

        </Box>
      </>
    );
  }

  return (
    <Box padding={"10px"}>
      <Header title={"Dashboard"} subtitle={"Welcome to your dashboard"} />
      <Box
        paddingLeft={"50px"}
        height={"80vh"}
        bgcolor={"none"}
        display={"flex"}
        gap={"1vw"}
        margin={"auto"}
        border={"none"}
      >
        {content}
      </Box>
    </Box>
  );
};

export default Dashboard;

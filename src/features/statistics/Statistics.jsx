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
import { useGetStaffsQuery } from "../staff/staffsApiSlice.js";
import { useGetExpensesQuery } from "../expenses/expensesApiSlice.js";

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

  const {
    data: staffs,
    isLoading: isstaffLoading,
    isSuccess: isstaffSuccess,
    isError: isstaffError,
    error: errorStaff,
  } = useGetStaffsQuery("staffsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: expenses,
    isLoading: isepenseLoading,
    isSuccess: isexpenseSuccess,
    isError: isexpenseError,
    error: errorExpense,
  } = useGetExpensesQuery("expensesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isStudLoading || isTransLoading || isstaffLoading || isepenseLoading) {
    content = <PulseLoader color={"orange"} />;
  }

  if (isStudError || isTransError || isstaffError || isexpenseError) {
    content = (
      <Box m="0 0 0" display={"grid"} justifyItems={"center"}>
        <p className="errmsg">
          {errorStud?.data?.message || errorTrans?.data?.message || errorExpense?.data?.message}
        </p>
      </Box>
    );
  }

  if (isStudSuccess && isTransSuccess && isstaffSuccess && isexpenseSuccess) {
    const { ids: transIds } = transactions;
    const transactionsData =
      transIds?.length &&
      transIds.map((transactionId) => transactions?.entities[transactionId]);

    // Expenses
    const { ids: expenseIds } = expenses;
      const expenseList =
      expenseIds?.length && expenseIds.map((expenseId) => expenses?.entities[expenseId]);

    // getting the total expenses
    let totalexpenses = 0;
    expenseList.forEach((expense) => {
      totalexpenses += expense.amount;
    });

    // staff
    const { ids: staffIds } = staffs;
    const stafflist =
      staffIds?.length && staffIds.map((staffId) => staffs?.entities[staffId]);

    // getting the total staff salary
    let totalstaffsalary = 0;
    stafflist.forEach((staff) => {
      totalstaffsalary += staff.salary;
    });

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

    const styleBox = {
      backgroundColor: "yellow",
    };

    content = (
      <>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"start"}
          gap={"1vh"}
        >
          <Box display={"flex"} flexDirection={"row"} gap={"7vh"}>
            <StudentStatsTile
              legendtitle={"Number of Students"}
              title={"Students:"}
              number={activeStudents?.length ? activeStudents.length : 0}
            />
            <TransactionStatsTile
              legendtitle={"Total Transactions"}
              title={"Tuition Fee:"}
              number={totalfeetransaction}
            />
            <TransactionStatsTile
              legendtitle={"Total Transactions"}
              title={"Registration Fee:"}
              number={totalregistrationTrans}
            />
            <TransactionStatsTile
              legendtitle={"Total Transactions"}
              title={"Total Fees:"}
              number={totalregistrationTrans + totalfeetransaction}
              sx={styleBox}
            />
          </Box>
        </Box>

        <Box
          width={"70vw"}
          display={"flex"}
          flexDirection={"row"}
          gap={"1.25vw"}
          alignItems={"start"}
          justifyContent={"center"}
          marginTop={"3rem"}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"11vh"}>
            <TransactionStatsTile
              legendtitle={"Total Amount"}
              title={"Expenses"}
              number={totalexpenses}
            />
            <TransactionStatsTile
              legendtitle={""}
              title={"Monthly Salaries"}
              number={totalstaffsalary}
            />
          </Box>
          <Box
            bgcolor={colors.primary[400]}
            width={"35vw"}
            height={"35vh"}
            padding={"20px"}
            marginLeft={"2rem"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <StudentsBarChart data={studChartdata} />
          </Box>

          <fieldset
            style={{
              height: "25vh",
              borderColor: colors.greenAccent[400],
              borderRadius: "10px",
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              justifySelf: "end",
              alignSelf: "end",
            }}
          >
            <legend
              style={{
                color: colors.grey[100],
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Menu
            </legend>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              padding={"12px 0px"}
              gap={"10px"}
              marginTop={"7rem"}
              marginLeft={"1rem"}
            >
              <AddBtn btnName={"Students"} handleEdit={handleStudents} />
              <AddBtn btnName={"Student Finance"} handleEdit={handleFees} />
              <AddBtn btnName={"Expenses"} handleEdit={handleExpense} />
              <AddBtn btnName={"Salaries"} handleEdit={handleSalaries} />
            </Box>
          </fieldset>
        </Box>
      </>
    );
  }

  return (
    <Box padding={"10px"}>
      <Header title={"Statistics"} subtitle={"System Statistics"} />
      <Box
        padding={"3px"}
        height={"68vh"}
        display={"flex"}
        flexDirection={"column"}
        // justifyContent={"center"}
        alignItems={"start"}
        gap={"2vw"}
        marginTop={"4.5rem"}
      >
        {content}
      </Box>
    </Box>
  );
};

export default Statistics;

import { Box } from "@mui/material";
import React from "react";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header.jsx";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useGetStudentsQuery } from "../students/studentsApiSlice.js";
import PulseLoader from "react-spinners/PulseLoader.js";
import StudentStatsTile from "../students/StudentStatsTile.jsx";
import StudentsBarChart from "../students/StudentsBarChart.jsx";
import StudentsPieChart from "../students/StudentsPieChart.jsx";

const StudentStats = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStudentsQuery("studentsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

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

  let content;
  if (isLoading) {
    content = <PulseLoader color={"orange"} />;
  }

  if (isError) {
    content = (
      <Box m="0 0 0" display={"grid"} justifyItems={"center"}>
        <p className="errmsg">{error?.data?.message}</p>
      </Box>
    );
  }

  if (isSuccess) {
    const { ids } = students;
    const studentsData =
      ids?.length && ids.map((studentId) => students?.entities[studentId]);

    const activeStudents = studentsData.filter((student) => !student.dismissed);
    const dismissedStudents = studentsData.filter(
      (student) => student.dismissed
    );

    // data for the general chart for students enrolled every day
    const data = countStudentsByDate(studentsData);

    // preparing data for the pie chart

    const studentCountBySection = activeStudents.reduce((acc, student) => {
      acc[student.sectionname] = (acc[student.sectionname] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(studentCountBySection);
    const dataValues = Object.values(studentCountBySection);

    const piechart_data = {
      labels: labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };

    content = (
      <>
        <Box display={"flex"} justifyContent={"start"} alignItems={"start"} gap={"3vw"}>
          <StudentStatsTile
            legendtitle={"Total Number of Students"}
            title={"School"}
            number={activeStudents?.length ? activeStudents.length : 0}
          />
          <StudentStatsTile
            legendtitle={"Total Number of Students"}
            title={"Dismissed"}
            number={dismissedStudents?.length ? dismissedStudents.length : 0}
          />
        </Box> 
        <Box display={"flex"} gap={"20px"}>
          <Box backgroundColor={colors.primary[400]} height={"40vh"} width={"35vw"} display={"flex"} justifyContent={"center"} alignItems={"start"}>
            <StudentsPieChart data={piechart_data} />
          </Box>
          <Box backgroundColor={colors.primary[400]} height={"40vh"} width={"35vw"} display={"flex"} justifyContent={"center"} alignItems={"start"}>
            <StudentsBarChart data={data} />
          </Box>
        </Box>
      </>
    );
  }

  return (
    <Box padding={"10px"}>

        <Box display={"flex"} justifyContent={"space-between"}>
          <Header title={"Statistics"} subtitle={"Students Statistics"} />
          <Link to={"/dash/stats"} style={{ color: colors.grey[100], hover: { color: colors.greenAccent[500], backgroundColor: colors.primary[400] } }}>
            <ArrowBackOutlinedIcon className="li_icon" />
          </Link>
        </Box>

      <Box
        padding={"5px"}
        height={"70vh"}
      >
        <Box
          height={"78vh"}
          display={"flex"}
          overflow={"auto"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"start"}
          gap={"30px"}
        >
          {content}
        </Box>
      </Box>
    </Box>
  );
};

export default StudentStats;

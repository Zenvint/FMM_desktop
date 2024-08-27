import { Box } from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";


const StudentStatsTile = ({ title, number}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const boxStyle = {
    width: "15vw",
    height: "12vh",
    backgroundColor: colors.primary[400],
    padding: "15px",
    margin: "auto 0",
  }

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "1rem",
    color: colors.grey[100],
    textAlign: "start",
  }

  const valueStyle = {
    color: colors.greenAccent[400],
    fontWeight: "700",
    fontSize: "1.15rem",
    textAlign: "center",
  }

  return (
    <Box>
        <Box sx={boxStyle}>
          <Box sx={titleStyle}>
            {title}
          </Box>
          <Box sx={valueStyle}>
            {" "}
            <CountUp start={0} end={number} duration={2.5} />
          </Box>
        </Box>
    </Box>
  );
};

export default StudentStatsTile;

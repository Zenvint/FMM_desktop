import { Box } from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";


const StudentStatsTile = ({legendtitle, title, number}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width={"16vw"} height={"12vh"}>
        <legend style={{ fontWeight: "bold"}}>{legendtitle}</legend>
        <Box
          width={"13vw"}
          height={"11vh"}
          bgcolor={colors.primary[400]}
          padding={"5px"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box color={colors.grey[100]} fontSize={"1rem"} fontWeight={"bold"}>
            {title}
          </Box>
          <Box color={colors.greenAccent[400]} fontWeight={"700"} fontSize={"1.5rem"}>
            {" "}
            <CountUp start={0} end={number} duration={2.5} />
          </Box>
        </Box>
    </Box>
  );
};

export default StudentStatsTile;

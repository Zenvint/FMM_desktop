import { Box } from "@mui/material";
import React from "react";
import CountUp from "react-countup";

const StudentStatsTile = ({legendtitle, title, number}) => {
  return (
    <Box width={"14vw"} height={"12vh"}>
      <fieldset>
        <legend>{legendtitle}</legend>
        <Box
          borderRadius={"10px"}
          border={"solid 3px green"}
          width={"13vw"}
          height={"11vh"}
          bgcolor={"white"}
          padding={"5px"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box color={"blue"} fontSize={"2rem"} fontWeight={"bold"}>
            {title}
          </Box>
          <Box color={"orange"} fontWeight={"700"} fontSize={"1.5rem"}>
            {" "}
            <CountUp start={0} end={number} duration={2.5} />
          </Box>
        </Box>
      </fieldset>
    </Box>
  );
};

export default StudentStatsTile;

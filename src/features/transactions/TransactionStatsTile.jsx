import { Box } from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";


const TransactionStatsTile = ({legendtitle, title, number}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    return (
        <Box width={"20vw"} height={"12vh"} marginLeft={"5px"}>
            <legend style={{ fontWeight: "bold"}}>{legendtitle}</legend>
            <Box
              width={"15vw"}
              height={"11vh"}
              bgcolor={colors.primary[400]}
              padding={"2px"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box color={colors.grey[100]} fontSize={"1rem"} fontWeight={"bold"}>
                {title}
              </Box>
              <Box color={colors.greenAccent[400]} fontWeight={"700"} fontSize={"1.1rem"}>
                {" "}
                <CountUp start={0} end={number} duration={2.5} /> {" FCFA"}
              </Box>
            </Box>
        </Box>
      );
}

export default TransactionStatsTile
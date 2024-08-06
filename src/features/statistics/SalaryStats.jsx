import { Box } from "@mui/material";
import React from "react";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header.jsx";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const SalaryStats = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <Box padding={"20px"}>
        <Header title={"Statistics"} subtitle={"Salary Statistics"} />
  
        <Box
          padding={"10px"}
          width={"78vw"}
          height={"83vh"}
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
  
          <Box width={"77vw"} height={"77vh"} overflow={"auto"} >
              
          </Box>
        </Box>
      </Box>
    );
}

export default SalaryStats
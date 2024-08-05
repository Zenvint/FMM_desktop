import React from "react";
import Header from "../../components/Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSalariesQuery } from "./salaryApiSlice.js";
import { AddBtn } from "../../components/Button.jsx";
import { Box } from "@mui/material";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";
import SalaryHistory from "./SalaryHistory.jsx";

const SalaryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { salary } = useGetSalariesQuery("salariesList", {
    selectFromResult: ({ data }) => ({
      salary: data?.entities[id],
    }),
  });

  const handleCancle = () => {
    navigate("/dash/finance/salaries");
  };

  const handleFee = () => {
    navigate(`/dash/finance/salaries/pay/${id}`);
  };

  return (
    <Box
      borderRadius={"10px"}
      m={"15px"}
      padding={"5px"}
      bgcolor={colors.primary[400]}
      display={"flex"}
      flexDirection={"column"}
      gap={"20px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Header title="Pay Details" subtitle={`Staff Named: ${salary.name}`} />

      <Box>
        <Box fontSize={"1.4rem"}>
          <div className="">Name: {salary.name}</div>
          <div className="">Role: {salary.sectionname}</div>
          <div className="">Monthly Salary: {salary.salary} FCFA</div>
        </Box>
        <Box display={"flex"} gap={"10vw"}>
          <fieldset>
            <legend>Salary Payment Status</legend>
            <div
              className={`${salary.status ? "fee-complete" : "fee-incomplete"}`}
            >
              <p>{salary.status ? "Paid" : "Not Paid"}</p>
            </div>
          </fieldset>
        </Box>
      </Box>

      <Box>
        <SalaryHistory id={id} />
      </Box>

      <Box
        marginTop={"5vh"}
        display={"flex"}
        width={"30vw"}
        justifyContent={"space-between"}
      >
        <AddBtn
          btnName={"Pay Salary"}
          handleEdit={handleFee}
          enabled={salary.status}
        />

        <AddBtn btnName={"Back"} handleEdit={handleCancle} />
      </Box>
    </Box>
  );
};

export default SalaryDetails;

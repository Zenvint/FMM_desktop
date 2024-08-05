import React from "react";
import Header from "../../components/Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFeesQuery } from "./feesApiSlice";
import { AddBtn } from "../../components/Button.jsx";
import { Box } from "@mui/material";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";
import FeeHistory from "./FeeHistory.jsx";

const FeeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { fee } = useGetFeesQuery("feesList", {
    selectFromResult: ({ data }) => ({
      fee: data?.entities[id],
    }),
  });


  const handleCancle = () => {
    navigate("/dash/finance/fees");
  };

  const handleFee = () => {
    navigate(`/dash/finance/fees/pay/${fee.id}`);
  };

  const handleDiscount = () => {
    navigate(`/dash/finance/fees/discount/${fee.id}`);
  };

  const handleRegistration = () => {
    navigate(`/dash/finance/fees/registration/${fee.id}`);
  };

  return (
    <Box borderRadius={"10px"} m={"15px"} padding={"5px"} bgcolor={colors.primary[400]} display={"flex"} flexDirection={"column"} gap={"20px"} justifyContent={"center"} alignItems={"center"} >
      <Header
        title="Student Details"
        subtitle={`Matricule: ${fee.matricule}`}
      />

      <Box>
        <Box fontSize={"1.4rem"}>
          <div className="">Name: {fee.studentname}</div>
          <div className="">Section: {fee.sectionname}</div>
          <div className="">Class: {fee.classname}</div>
          <div className="">Total Fee: {fee.tuition} FCFA</div>
          <div className="">Discount: {fee.discount} FCFA</div>
          <div className="">Amount Paid: {fee.amountPaid} FCFA</div>
          <div className="">Balance: {fee.balance} FCFA</div>
        </Box>
        <Box display={"flex"} gap={"10vw"} >
          <fieldset>
            <legend>TuitionFee</legend>
            <div
              className={`${fee.status ? "fee-complete" : "fee-incomplete"}`}
            >
              <p>{fee.status ? "Completed" : "Incomplete"}</p>
            </div>
          </fieldset>
          <fieldset>
            <legend>Registration Fee</legend>
            <div
              className={`${
                fee.registrationfee ? "fee-complete" : "fee-incomplete"
              }`}
            >
              <p>{fee.registrationfee ? "Paid" : "Not Paid"}</p>
            </div>
          </fieldset>
        </Box>
      </Box>

      <Box>
        <FeeHistory id={id} />
      </Box>

      <Box marginTop={"5vh"} display={"flex"} width={"30vw"} justifyContent={"space-between"}>
        <AddBtn
          btnName={"Pay Fee"}
          handleEdit={handleFee}
          enabled={fee.status}
        />
        <AddBtn
          btnName={"Pay Registration"}
          handleEdit={handleRegistration}
          enabled={fee.registrationfee}
        />
        <AddBtn
          btnName={"Manage Discount"}
          handleEdit={handleDiscount}
          enabled={fee.status}
        />
        <AddBtn btnName={"Back"} handleEdit={handleCancle} />
      </Box>
    </Box>
  );
};

export default FeeDetails;

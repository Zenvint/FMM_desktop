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
  <Box margin={"1rem"}>  
    <Header
        title="Student Details"
        subtitle={`Matricule: ${fee.matricule}`}
      />

    <Box style={{ background:colors.primary[400], padding: "15px", borderRadius: "10px", width: "100%", margin: "auto"}}>
      <Box>
        <Box fontSize={"14px"}>
          <div className="">Name: {fee.studentname}</div>
          <div className="">Section: {fee.sectionname}</div>
          <div className="">Class: {fee.classname}</div>
          <div className="">Total Fee: {fee.tuition} FCFA</div>
          <div className="">Discount: {fee.discount} FCFA</div>
          <div className="">Amount Paid: {fee.amountPaid} FCFA</div>
          <div className="">Balance: {fee.balance} FCFA</div>
        </Box>
        <Box display={"flex"} gap={"0"} >
          <fieldset style={{ display: "flex", width: "10vw", height: "5vh", justifyContent: "center", alignItems: "center" }}>
            <legend>TuitionFee</legend>
            <div
              className={`${fee.status ? "fee-complete" : "fee-incomplete"}`}
            >
              <p>{fee.status ? "Completed" : "Incomplete"}</p>
            </div>
          </fieldset>
          <fieldset style={{ display: "flex", width: "15vw", height: "5vh", justifyContent: "center", alignItems: "center" }}>
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

      <Box marginTop={"3vh"} display={"flex"} width={"30vw"} justifyContent={"end"}>
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
    </Box>
  );
};

export default FeeDetails;

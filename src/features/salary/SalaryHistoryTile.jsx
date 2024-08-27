import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { AddBtn } from "../../components/Button.jsx";
import { useUpdateSalaryHistoryMutation } from "./salaryApiSlice.js";
import { useAddNewTransactionMutation } from "../transactions/transactionApiSlice.js";
import { useSnackbar } from "notistack";
import useConfirmSnackbar from "../../hooks/useConfirmSnackbar.js";
import TRANSACTIONTYPE from "../../configs/transactiontype.js";
import PulseLoader from "react-spinners/PulseLoader.js";
import { useNavigate } from "react-router-dom";

const SalaryHistoryTile = ({ id, record, datestring }) => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const {showConfirmation} = useConfirmSnackbar()
    const [updateSalryHistory, { isLoading, isSuccess, isError, error }] =
    useUpdateSalaryHistoryMutation();
  
    const [
      createTransaction,
      {
        isLoading: isTransLoading,
        isSuccess: isTransSuccess,
        isError: isTransError,
        error: transError,
      },
    ] = useAddNewTransactionMutation();
  
    const proceedPayment = async() => {
      const deposit = record.salary
      await updateSalryHistory({id, status: !record.status, datestring});
      await createTransaction({transactiontype: TRANSACTIONTYPE.Salary, amount: deposit})
    }
  
    const handlePay = () => {
      showConfirmation("Are you sure you want to proceed with Payment?", proceedPayment);
    }
  
    useEffect(() => {
      if (isSuccess && isTransSuccess) {
        enqueueSnackbar(`fee paid Successfully.`, {
          variant: "success",
        });
       navigate("/dash/finance/salaries");
      }
    }, [isSuccess, isTransSuccess]);
  
    useEffect(() => {
      if (isError || isTransError) {
        enqueueSnackbar(`An Error Occured.`, {
          variant: "error",
        });
      }
    }, [isError, isTransError]);
  
    const errClass = isError || isTransError ? "errmsg" : "offscreen";
  
    const errContent = (error?.data?.message || transError?.data?.message) ?? "";
    return (
      <Box >
        <fieldset style={{borderRadius:"15px", margin:"5px", padding:"10px", width:"85%"}}>
          <legend>Records Session: {datestring}</legend>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <div className="">Salary: {record.salary} FCFA</div>
            </Box>
            <fieldset>
              <legend>Salary</legend>
              <div
                className={`${record.status ? "fee-complete" : "fee-incomplete"}`}
              >
                <p>{record.status ? "Paid" : "Not Paid"}</p>
              </div>
            </fieldset>
            <AddBtn btnName={"Pay Salary"} enabled={record.status} handleEdit={handlePay} />
          </Box>
          {(isLoading || isError || isTransLoading || isTransError) && (
            <Box>
              {(isLoading || isTransLoading) && <PulseLoader color={"#FFF"} />}
              <p className={errClass}>{errContent}</p>
            </Box>
          )}
        </fieldset>
      </Box>
    );
}

export default SalaryHistoryTile
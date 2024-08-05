import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddBtn } from "../../components/Button.jsx";
import { useUpdateFeeHistoryMutation } from "./feesApiSlice.js";
import { useAddNewTransactionMutation } from "../transactions/transactionApiSlice.js";
import { useSnackbar } from "notistack";
import useConfirmSnackbar from "../../hooks/useConfirmSnackbar.js";
import TRANSACTIONTYPE from "../../configs/transactiontype.js";
import PulseLoader from "react-spinners/PulseLoader.js";

const FeeHistoryTile = ({ id, record, yearstring }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {showConfirmation} = useConfirmSnackbar()
  const [updateFeeHistory, { isLoading, isSuccess, isError, error }] =
    useUpdateFeeHistoryMutation();

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
    console.log("proceeding")
    const deposit = record.balance
    console.log(deposit)
    await updateFeeHistory({id, discount: record.discount, amountPaid: record.amountPaid + deposit, balance: 0, status: !record.status, yearstring});
    await createTransaction({transactiontype: TRANSACTIONTYPE.Tuition, amount: deposit})
  }

  const handlePay = () => {
    showConfirmation("Are you sure you want to proceed with Payment?", proceedPayment);
  }

  useEffect(() => {
    if (isSuccess && isTransSuccess) {
      enqueueSnackbar(`fee paid Successfully.`, {
        variant: "success",
      });
      navigate(`/dash/finance/fees/feereceipt/${id}/${record.balance}`);
    }
  }, [isSuccess, isTransSuccess, navigate]);

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
    <Box>
      <fieldset>
        <legend>Records Session: {yearstring}</legend>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <div className="">Section: {record.sectionname} </div>
            <div className="">Class: {record.classname} </div>
            <div className="">Discount: {record.discount} FCFA</div>
            <div className="">Amount Paid: {record.amountPaid} FCFA</div>
            <div className="">Balance: {record.balance} FCFA</div>
          </Box>
          <fieldset>
            <legend>TuitionFee</legend>
            <div
              className={`${record.status ? "fee-complete" : "fee-incomplete"}`}
            >
              <p>{record.status ? "Completed" : "Incomplete"}</p>
            </div>
          </fieldset>
          <AddBtn btnName={"Pay Fee"} enabled={record.status} handleEdit={handlePay} />
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
};

export default FeeHistoryTile;

/** @format */
import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFeesQuery, useUpdateFeeMutation } from "./feesApiSlice";
import { useAddNewTransactionMutation } from "../transactions/transactionApiSlice.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader.js";
import { useSnackbar } from "notistack";
import { AddBtn } from "../../components/Button.jsx";
import TRANSACTIONTYPE from "../../configs/transactiontype.js";

const RegistrationFeeForm = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
  
    const { fee } = useGetFeesQuery("feesList", {
      selectFromResult: ({ data }) => ({
        fee: data?.entities[id],
      }),
    });
  
    const [deposit, setDeposit] = useState(0);
    const [studFee, setStudFee] = useState();
    const [amountPaid, setAmountPaid] = useState(Number(fee.amountPaid));
    const [balance, setBalance] = useState(Number(fee.balance));
    const [status, setStatus] = useState(fee.status);
    
  
    const [updateFee, { isLoading, isSuccess, isError, error }] =
      useUpdateFeeMutation();
  
    const [createTransaction, { isLoading: isTransLoading, isSuccess: isTransSuccess, isError: isTransError, error: transError }] =
      useAddNewTransactionMutation();
  
    const on1stInstallChanged = (e) => {
      const value = e.target.value;
      if (!isNaN(value)) {
        setDeposit(parseInt(value));
      }
    };
  
    const handleCancle = () => {
      navigate("/dash/finance/fees");
    };
  
    const onSaveSectionClicked = async (e) => {
      if (deposit > balance) {
        enqueueSnackbar(
          `Deposit amount should be less than or equal to the balance`,
          {
            variant: "info",
          }
        );
        return;
      }
      const newBalance = balance - deposit;
      const newAP = amountPaid + deposit;
  
      let updatedfee;
  
      if (deposit === balance) {
        updatedfee = {
          id: fee.id,
          registrationfee: fee.registrationfee,
          amountPaid: newAP,
          balance: newBalance,
          status: !status,
          discount: fee.discount,
        };
      } else {
        updatedfee = {
          id: fee.id,
          registrationfee: fee.registrationfee,
          amountPaid: newAP,
          balance: newBalance,
          status: status,
          discount: fee.discount,
        };
      }
      
  
      await updateFee({...updatedfee});
      await createTransaction({transactiontype: TRANSACTIONTYPE.Tuition, amount: deposit})
    };
  
    useEffect(() => {
      if (isSuccess && isTransSuccess) {
        enqueueSnackbar(`${fee.studentname} fee paid Successfully.`, {
          variant: "success",
        });
        navigate(`/dash/finance/fees/feereceipt/${fee.id}/${deposit}`)
      }
    }, [isSuccess,isTransSuccess, navigate]);
  
    useEffect(() => {
      if (isError || isTransError) {
        enqueueSnackbar(`An Error Occured.`, {
          variant: "error",
        });
      }
    }, [isError, isTransError]);
  
    let canSave = !isLoading && !isTransLoading && !fee.status && deposit > 0;
  
    const errClass = isError || isTransError ? "errmsg" : "offscreen";
  
    const errContent = (error?.data?.message || transError?.data?.message) ?? "";
  
    if (!fee || isLoading || isTransLoading) return <PulseLoader color={"#FFF"} />;
  
    return (
  
        <Box m="20px">
          <Header
            title="Pay Fee"
            subtitle={`${fee.studentname} with matricule: ${fee.matricule}`}
          />
  
          <div className={`class_container}`}>
            <div className="">Total Fee: {fee.tuition} FCFA</div>
            <div className="">Discount: {fee.discount} FCFA</div>
            <div className="">Amount Paid: {fee.amountPaid} FCFA</div>
            <div className="">Balance: {fee.balance} FCFA</div>
            <div className={`${fee.status ? "fee-complete" : "fee-incomplete"}`}>
              <p>{fee.status ? "Completed" : "Incomplete"}</p>
            </div>
          </div>
  
          <p className={errClass}>{errContent}</p>
  
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-container">
              <label htmlFor="paid-amount">Deposit:</label>
              <input
                id="paid-amount"
                type="number"
                min={0}
                placeholder="XXX FCFA"
                required
                autoComplete="off"
                value={deposit}
                onChange={on1stInstallChanged}
                disabled={fee.status}
              />
            </div>
  
            <Box>
              <AddBtn
                btnName={"Save"}
                handleEdit={onSaveSectionClicked}
                enabled={!canSave}
              />
              <AddBtn btnName={"Cancel"} handleEdit={handleCancle} />
            </Box>
          </form>
        </Box>
        
    );
}

export default RegistrationFeeForm
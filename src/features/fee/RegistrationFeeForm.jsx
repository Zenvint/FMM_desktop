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
  
      let updatedfee = {
        id: fee.id,
        registrationfee: !fee.registrationfee,
        amountPaid: fee.amountPaid,
        balance: fee.balance,
        status: fee.status,
        discount: fee.discount,
      };
    
      await updateFee({...updatedfee});
      await createTransaction({transactiontype: TRANSACTIONTYPE.Registration, amount: deposit})
    };
  
    useEffect(() => {
      if (isSuccess && isTransSuccess) {
        enqueueSnackbar(`${fee.studentname} Registration fee paid Successfully.`, {
          variant: "success",
        });
        navigate(`/dash/finance/fees/registrationreceipt/${fee.id}/${deposit}`)
      }
    }, [isSuccess,isTransSuccess, navigate]);
  
    useEffect(() => {
      if (isError || isTransError) {
        enqueueSnackbar(`An Error Occured.`, {
          variant: "error",
        });
      }
    }, [isError, isTransError]);
  
    let canSave = !isLoading && !isTransLoading && !fee.registrationfee && deposit > 0;
  
    const errClass = isError || isTransError ? "errmsg" : "offscreen";
  
    const errContent = (error?.data?.message || transError?.data?.message) ?? "";
  
    if (!fee || isLoading || isTransLoading) return <PulseLoader color={"#FFF"} />;
  
    return (
  
        <Box m="20px">
          <Header
            title="Registration Fee"
            subtitle={`${fee.studentname} with matricule: ${fee.matricule}`}
          />
  
          <div className={`class_container}`}>
            <div className="">Total Fee: {fee.tuition} FCFA</div>
            <div className="">Discount: {fee.discount} FCFA</div>
            <div className="">Amount Paid: {fee.amountPaid} FCFA</div>
            <div className="">Balance: {fee.balance} FCFA</div>
            <div className={`${fee.registrationfee ? "fee-complete" : "fee-incomplete"}`}>
              <p>{fee.registrationfee ? "Paid" : "Not Paid"}</p>
            </div>
          </div>
  
          <p className={errClass}>{errContent}</p>
  
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-container">
              <label htmlFor="paid-amount">Registration fee:</label>
              <input
                id="paid-amount"
                type="number"
                min={0}
                placeholder="XXX FCFA"
                required
                autoComplete="off"
                value={deposit}
                onChange={on1stInstallChanged}
                disabled={fee.registrationfee}
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
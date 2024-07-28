/** @format */
import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSalariesQuery,
  useUpdateSalaryMutation,
} from "./salaryApiSlice.js";
import { useAddNewTransactionMutation } from "../transactions/transactionApiSlice.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader.js";
import { useSnackbar } from "notistack";
import { AddBtn } from "../../components/Button.jsx";
import TRANSACTIONTYPE from "../../configs/transactiontype.js";

const PaySalaryForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const { salary } = useGetSalariesQuery("salariesList", {
    selectFromResult: ({ data }) => ({
      salary: data?.entities[id],
    }),
  });

  const [updateSalary, { isLoading, isSuccess, isError, error }] =
  useUpdateSalaryMutation();

  const [
    createTransaction,
    {
      isLoading: isTransLoading,
      isSuccess: isTransSuccess,
      isError: isTransError,
      error: transError,
    },
  ] = useAddNewTransactionMutation();

  const handleCancle = () => {
    navigate("/dash/finance/salaries");
  };

  const onSaveSectionClicked = async (e) => {
    await updateSalary({
      id: salary.id,
      staffId: salary.staffId,
      salary: salary.salary,
      status: !salary.status,
    });
    await createTransaction({
      transactiontype: TRANSACTIONTYPE.Salary,
      amount: salary.salary,
    });
  };

  useEffect(() => {
    if (isSuccess && isTransSuccess) {
      enqueueSnackbar(`${salary.name} salary paid Successfully.`, {
        variant: "success",
      });
      navigate(`/dash/finance/salaries`);
    }
  }, [isSuccess, isTransSuccess, navigate]);

  useEffect(() => {
    if (isError || isTransError) {
      enqueueSnackbar(`An Error Occured.`, {
        variant: "error",
      });
    }
  }, [isError, isTransError]);

  let canSave = !isLoading && !isTransLoading && !salary.status;

  const errClass = isError || isTransError ? "errmsg" : "offscreen";

  const errContent = (error?.data?.message || transError?.data?.message) ?? "";

  if (!salary || isLoading || isTransLoading)
    return <PulseLoader color={"#FFF"} />;

  return (
    <Box m="20px">
      <Header
        title="Pay Salary"
        subtitle={`${salary.studentname} with matricule: ${salary.matricule}`}
      />

      <div className={`class_container}`}>
        <div className="">Name: {salary.name}</div>
        <div className="">Role: {salary.sectionname}</div>
        <div className="">Monthly Salary: {salary.salary} FCFA</div>
        <fieldset>
          <legend>Salary Payment Status</legend>
          <div
            className={`${salary.status ? "fee-complete" : "fee-incomplete"}`}
          >
            <p>{salary.status ? "Paid" : "Not Paid"}</p>
          </div>
        </fieldset>
      </div>

      <p className={errClass}>{errContent}</p>

      <Box>
        <AddBtn
          btnName={"Save"}
          handleEdit={onSaveSectionClicked}
          enabled={!canSave}
        />
        <AddBtn btnName={"Cancel"} handleEdit={handleCancle} />
      </Box>
    </Box>
  );
};

export default PaySalaryForm;

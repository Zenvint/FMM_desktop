import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAddNewExpenseMutation } from "./expensesApiSlice.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useSnackbar } from "notistack";

const NewExpenseForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [addNewExpense, { isLoading, isSuccess, isError, error }] =
    useAddNewExpenseMutation();

  const navigate = useNavigate();

  const [benefactor, setBenefactor] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (isSuccess) {
      setBenefactor("");
      setAmount(0);
      setDescriptions("");
      enqueueSnackbar(`expense added Seccessfully!`, { variant: "success" });
      navigate("/dash/finance/expenses");
    }
  }, [isSuccess, navigate, enqueueSnackbar]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(`could not add expenses`, { variant: "error" });
    }
  }, [isError]);

  const onBenefactorChanged = (e) => setBenefactor(e.target.value);
  const onDescriptionsChanged = (e) => setDescriptions(e.target.value);
  const onAmountChanged = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setAmount(parseInt(value));
    }
  };

  const canSave = !isLoading ;

  const onSaveClassClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewExpense({
        benefactor,
        descriptions,
        amount,
      });
    }
  };

  const errClass = isError  ? "errmsg" : "offscreen";

  if (isLoading ) {
    return <PulseLoader color={"#FFF"} />;
  }


  const errContent =
    (error?.data?.message) ?? "";

  return (
    <Box m="20px">
      <Header title="New Expense" />

      <p className={errClass}>{errContent}</p>

      <form onSubmit={onSaveClassClicked}>
        <div className="input-container">
          <label htmlFor="classname">Benefactor:</label>
          <input
            id="classname"
            type="text"
            placeholder="Enter Benefactor"
            required
            autoComplete="off"
            value={benefactor}
            onChange={onBenefactorChanged}
          />
        </div>

        <div className="input-container">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            type="text"
            placeholder="Enter Description"
            required
            autoComplete="off"
            value={descriptions}
            onChange={onDescriptionsChanged}
          />
        </div>

        <div className="input-container">
          <label htmlFor="tuition">Amount:</label>
          <input
            id="tuition"
            type="number"
            min={0}
            placeholder="Enter Class Tuition FCFA"
            required
            autoComplete="off"
            value={amount}
            onChange={onAmountChanged}
          />
        </div>

        <button className="submit-button" type="submit" disabled={!canSave}>
          Save
        </button>
        <Link to={"/dash/finance/expenses"}>
          <button className="submit-button" variant="contained">
            Cancel
          </button>
        </Link>
      </form>
    </Box>
  );
};

export default NewExpenseForm;

/** @format */
import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpensesQuery,
} from "./expensesApiSlice.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader.js";
import { useSnackbar } from "notistack";

const EditExpenseForn = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const { expense } = useGetExpensesQuery("expensesList", {
    selectFromResult: ({ data }) => ({
      expense: data?.entities[id],
    }),
  });

  //   useEffect(()=> {console.log(section)}, [section])

  const [updateExpense, { isLoading, isSuccess, isError, error }] =
    useUpdateExpenseMutation();

  const [
    deleteExpense,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteExpenseMutation();

  const navigate = useNavigate();

  const [isDelLoading, setIsDelLoading] = useState(false);

  const [benefactor, setBenefactor] = useState(expense.benefactor);
  const [descriptions, setDescriptions] = useState(expense.descriptions);
  const [amount, setAmount] = useState(expense.amount);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setIsDelLoading(false);
      enqueueSnackbar(`Seccess`, { variant: "success" });
      setBenefactor("");
      setAmount(0);
      setDescriptions("");
      navigate("/dash/finance/expenses");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  useEffect(() => {
    if (isError || isDelError) {
      setIsDelLoading(false);
      enqueueSnackbar(`An Error occured`, { variant: "error" });
    }
  }, [isError, isDelError]);

  const onBenefactorChanged = (e) => setBenefactor(e.target.value);
  const onDescriptionsChanged = (e) => setDescriptions(e.target.value);
  const onAmountChanged = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setAmount(parseInt(value));
    }
  };

  const onSaveExpenseClicked = async (e) => {
    await updateExpense({ id: expense.id, benefactor, descriptions, amount });
  };

  const onDeleteExpenseClicked = async () => {
    setIsDelLoading(true);
    await deleteExpense({ id: expense.id });
  };

  let canSave = !isLoading;

  const errClass = isError || isDelError ? "errmsg" : "offscreen";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  if (!expense || isLoading || isDelLoading)
    return <PulseLoader color={"#FFF"} />;

  return (
    <Box m="20px">
      <Header title="Update Section" />

      <p className={errClass}>{errContent}</p>

      <form onSubmit={(e) => e.preventDefault()}>
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

        <button
          className="submit-button"
          onClick={onSaveExpenseClicked}
          disabled={!canSave}
        >
          Save
        </button>
        <Link to={"/dash/finance/expenses"}>
          <button className="submit-button" variant="contained">
            Cancel
          </button>
        </Link>
        <button className="submit-button" onClick={onDeleteExpenseClicked}>
          Delete
        </button>
      </form>
    </Box>
  );
};

export default EditExpenseForn;

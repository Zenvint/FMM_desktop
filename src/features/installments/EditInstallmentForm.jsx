/** @format */
import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetInstallmentsQuery,
  useUpdateInstallmentMutation,
} from "./installmentsApiSlice.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader.js";
import { useSnackbar } from "notistack";
import { useTheme } from "@mui/material";
import { tokens } from "../../hooks/theme.js";


const EditInstallmentForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { installment } = useGetInstallmentsQuery("installmentsList", {
    selectFromResult: ({ data }) => ({
      installment: data?.entities[id],
    }),
  });

  const [firstinstallment, setFirstinstallment] = useState(
    installment.firstinstallment
  );
  const [secondinstallment, setSecondinstallment] = useState(
    installment.secondinstallment
  );
  const [thirdinstallment, setThirdinstallment] = useState(
    installment.thirdinstallment
  );

  const [updateInstallment, { isLoading, isSuccess, isError, error }] =
    useUpdateInstallmentMutation();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(
        `${installment.sectionname} installments updated successfully.`,
        { variant: "success" }
      );
      navigate("/dash/settings/installments");
    }
  }, [isSuccess, navigate]);

  const on1stInstallChanged = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setFirstinstallment(parseInt(value));
    }
  };

  const on2ndInstallChanged = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setSecondinstallment(parseInt(value));
    }
  };

  const on3rdInstallChanged = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setThirdinstallment(parseInt(value));
    }
  };

  const onSaveSectionClicked = async (e) => {
    const total = firstinstallment + secondinstallment + thirdinstallment;
    if (total === 100) {
      await updateInstallment({
        id: installment.id,
        sectionId: installment.sectionId,
        firstinstallment,
        secondinstallment,
        thirdinstallment,
      });
    } else {
      enqueueSnackbar(`installments should sum up to 100%.`, {
        variant: "error",
      });
    }
  };

  let canSave = !isLoading;

  const errClass = isError ? "errmsg" : "offscreen";

  const errContent = error?.data?.message ?? "";

  if (!installment || isLoading) return <PulseLoader color={"#FFF"} />;

  return (
    <Box m="20px">
      <Header
        title="Update Installments"
        subtitle={`${installment.sectionname} Section`}
      />

      <p className={errClass}>{errContent}</p>

      <form onSubmit={(e) => e.preventDefault()} style={{ background:colors.primary[400], padding: "25px", borderRadius: "10px", width: "70%", margin: "auto", justifyContent: "center", alignItems: "center" }}>
        <div className="input-container">
          <label htmlFor="1st-install">First Installment:</label>
          <input
            id="1st-install"
            type="number"
            min={0}
            max={100}
            placeholder="(0-100)%"
            required
            autoComplete="off"
            value={firstinstallment}
            onChange={on1stInstallChanged}
          />
        </div>

        <div className="input-container">
          <label htmlFor="2nd-install">Second Installment:</label>
          <input
            id="2nd-install"
            type="number"
            min={0}
            max={100}
            placeholder="(0-100)%"
            required
            autoComplete="off"
            value={secondinstallment}
            onChange={on2ndInstallChanged}
          />
        </div>

        <div className="input-container">
          <label htmlFor="3rd-install">Third Installment:</label>
          <input
            id="3rd-install"
            type="number"
            min={0}
            max={100}
            placeholder="(0-100)%"
            required
            autoComplete="off"
            value={thirdinstallment}
            onChange={on3rdInstallChanged}
          />
        </div>

        <button
          className="submit-button"
          onClick={onSaveSectionClicked}
          disabled={!canSave}
          style={{marginLeft: "16rem"}}
        >
          Save
        </button>
        <Link to={"/dash/settings/installments"} style={{ marginLeft: "20px"}}>
          <button className="submit-button" variant="contained" style={{ backgroundColor: colors.grey[400]}}>
            Cancel
          </button>
        </Link>
      </form>
    </Box>
  );
};

export default EditInstallmentForm;

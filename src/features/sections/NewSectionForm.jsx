/** @format */
import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAddNewSectionMutation } from "./sectionsApiSlice.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useSnackbar } from "notistack";

const NewSectionForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [addNewSection, { isLoading, isSuccess, isError, error }] = useAddNewSectionMutation();

  const navigate = useNavigate();

  const [sectionname, setSectionname] = useState("");
 

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(`Section added Seccessfully!`, { variant: "success" });
      setSectionname("");
      navigate("/dash/settings/sections");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if(isError) {
      enqueueSnackbar(`could not add section`, { variant: "error" });
    }
  }, [isError])

  const onSectionnameChanged = (e) => setSectionname(e.target.value);
  

  const canSave = !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewSection({ sectionname});
    }
  };


  const errClass = isError ? "errmsg" : "offscreen";

  if (isLoading){
    return <PulseLoader color={"#FFF"} />;
  }

  return (
    <Box m="20px">
      <Header title="New Section" />

      <p className={errClass}>{error?.data?.message}</p>

      <form onSubmit={onSaveUserClicked}>
        <div className="input-container">
          <label htmlFor="sectionname">Section Name:</label>
          <input
            id="sectionname"
            type="text"
            placeholder="Enter Section Name"
            required
            autoComplete="off"
            value={sectionname}
            onChange={onSectionnameChanged}
          />
        </div>

        <button className="submit-button" type="submit" disabled={!canSave}>
          Save
        </button>
        <Link to={"/dash/settings/sections"}>
          <button className="submit-button" variant="contained">
            Cancel
          </button>
        </Link>
      </form>
    </Box>
  );
};

export default NewSectionForm;

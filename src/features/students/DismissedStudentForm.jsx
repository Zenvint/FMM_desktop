import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDismissStudentMutation } from "./studentsApiSlice.js";
import { useGetStudentsQuery } from "./studentsApiSlice.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useSnackbar } from "notistack";
import { AddBtn } from "../../components/Button.jsx";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";


const DismissedStudentForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { student } = useGetStudentsQuery("studentsList", {
    selectFromResult: ({ data }) => ({
      student: data?.entities[id],
    }),
  });
  const [dismissStudent, { isLoading, isSuccess, isError, error }] =
    useDismissStudentMutation();

  const navigate = useNavigate();

  const [descriptions, setDescriptions] = useState(student.dismissalreason);

  useEffect(() => {
    if (isSuccess) {
      setDescriptions("");
      enqueueSnackbar(
        `Dismissed student with Matricule: ${student.matricule}!`,
        { variant: "success" }
      );
      navigate("/dash/students");
    }
  }, [isSuccess, navigate, enqueueSnackbar]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(`could not Dismiss Student`, { variant: "error" });
    }
  }, [isError]);

  const onDescriptionsChanged = (e) => setDescriptions(e.target.value);

  const canSave = !isLoading;

  const onSaveClassClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await dismissStudent({
        id,
        dismissalreason: descriptions,
        dismissed: true,
      });
    }
  };

  const handleCancel = () => {
    navigate("/dash/students");
  }

  const handleUnDismiss = async () => {
    await dismissStudent({
      id,
      dismissalreason: "",
      dismissed: false,
    });
  };

  const errClass = isError ? "errmsg" : "offscreen";

  if (isLoading) {
    return <PulseLoader color={"#FFF"} />;
  }

  const errContent = error?.data?.message ?? "";

  return (
    <Box m="20px">
      <Header
        title="Dismiss Form"
        subtitle={`${student.fullname} with Matricule: ${student.matricule}`}
      />

      <p className={errClass}>{errContent}</p>

      <form onSubmit={onSaveClassClicked} style={{ background:colors.primary[400], padding: "25px", borderRadius: "10px", width: "70%", margin: "auto"}}>
        <div className="input-container">
          <label htmlFor="description">Reason:</label>
          <textarea
            id="description"
            type="text"
            placeholder="Enter Reason"
            required
            autoComplete="off"
            value={descriptions}
            onChange={onDescriptionsChanged}
            style={{height: "100px"}}
          />
        </div>

        <button className="submit-button" type="submit" disabled={!canSave || student.dismissed} style={{background:"red"}}>
          Dismiss
        </button>

        <AddBtn btnName={"Cancel"} handleEdit={handleCancel} />

        <AddBtn
          btnName={"Un Dismiss"}
          enabled={!student.dismissed}
          handleEdit={handleUnDismiss}
        />
      </form>
    </Box>
  );
};

export default DismissedStudentForm;

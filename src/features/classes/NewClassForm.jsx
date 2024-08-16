import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAddNewClassMutation } from "./classesApiSlice.js";
import { useGetSectionsQuery } from "../sections/sectionsApiSlice.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useSnackbar } from "notistack";
import { useTheme } from "@mui/material";
import { tokens } from "../../hooks/theme.js";


const NewClassForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [addNewClass, { isLoading, isSuccess, isError, error }] =
    useAddNewClassMutation();
  const {
    data: sections,
    isLoading: isLoadingSections,
    isSuccess: isSuccessSections,
    isError: isErrorSection,
    error: errorSection,
  } = useGetSectionsQuery("sectionsList", {
    pollingInterval: 600000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();

  const [classname, setClassname] = useState("");
  const [tuition, setTuition] = useState(0);
  const [selectedSection, setSelectedSection] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (isSuccess) {
      setClassname("");
      setTuition("");
      setSelectedSection("");
      enqueueSnackbar(`class added Seccessfully!`, { variant: "success" });
      navigate("/dash/settings/classes");
    }
  }, [isSuccess, navigate, enqueueSnackbar]);

  useEffect(() => {
    if(isError) {
      enqueueSnackbar(`could not add class`, { variant: "error" });
    }
  }, [isError])

  const onClassnameChanged = (e) => setClassname(e.target.value);
  const handleSectionChange = (e) => setSelectedSection(e.target.value);
  const onTuitionChanged = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setTuition(parseInt(value));
    }
  };

  const canSave = !isLoading && !isLoadingSections;

  const onSaveClassClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewClass({
        classname: classname,
        sectionId: selectedSection,
        tuition: tuition,
      });
    }
  };

  const errClass = isError || isErrorSection ? "errmsg" : "offscreen";

  if (isLoading || isLoadingSections) {
    return <PulseLoader color={"#FFF"} />;
  }

  let sectionsListOptions;
  if (isSuccessSections) {
    const { ids } = sections;
    const sectionsObject =
      ids?.length && ids.map((userId) => sections?.entities[userId]);
    sectionsListOptions =
      sectionsObject?.length &&
      sectionsObject.map((sectionObj) => (
        <option key={sectionObj.id} value={sectionObj.id}>
          {sectionObj.sectionname}
        </option>
      ));
  }

  const errContent =
    (error?.data?.message || errorSection?.data?.message) ?? "";

  return (
    <Box m="20px">
      <Header title="New Class" />

      <p className={errClass}>{errContent}</p>

      <form onSubmit={onSaveClassClicked} style={{ background:colors.primary[400], padding: "25px", borderRadius: "10px", width: "70%", margin: "auto", justifyContent: "center", alignItems: "center" }}>
        <div className="input-container">
          <label htmlFor="classname">Class Name:</label>
          <input
            id="classname"
            type="text"
            placeholder="Enter Class Name"
            required
            autoComplete="off"
            value={classname}
            onChange={onClassnameChanged}
          />
        </div>

        <div className="input-container">
          <label htmlFor="tuition">Class Tuition:</label>
          <input
            id="tuition"
            type="number"
            min={0}
            placeholder="Enter Class Tuition FCFA"
            required
            autoComplete="off"
            value={tuition}
            onChange={onTuitionChanged}
          />
        </div>

        {isSuccessSections && (
          <div className="class_container">
            <div className="input-container">
              <label htmlFor="sections" className="dropdown">
                {" "}
                Sections:{" "}
              </label>
              <select
                id="sections"
                placeholder="Select the section"
                value={selectedSection}
                onChange={handleSectionChange}
                required
                style={{ height: "30px" }}
              >
                <option value="">Select the section</option>
                {sectionsListOptions}
              </select>
            </div>
          </div>
        )}

        <button className="submit-button" type="submit" disabled={!canSave} style={{marginLeft: "16rem"}}>
          Save
        </button>
        <Link to={"/dash/settings/classes"} style={{ marginLeft: "20px"}}>
          <button className="submit-button" variant="contained" style={{ backgroundColor: colors.grey[400]}}>
            Cancel
          </button>
        </Link>
      </form>
    </Box>
  );
};

export default NewClassForm;

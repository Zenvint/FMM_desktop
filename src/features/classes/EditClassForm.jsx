/** @format */
import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useUpdateClassMutation,
  useDeleteClassMutation,
  useGetClassesQuery,
} from "./classesApiSlice";
import { useGetSectionsQuery } from "../sections/sectionsApiSlice";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader.js";
import { useSnackbar } from "notistack";
import { useTheme } from "@mui/material";
import { tokens } from "../../hooks/theme.js";

const EditClassForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { classObj } = useGetClassesQuery("classesList", {
    selectFromResult: ({ data }) => ({
      classObj: data?.entities[id],
    }),
  });

  //   useEffect(()=> {console.log(classObj)}, [classObj])

  const [updateClass, { isLoading, isSuccess, isError, error }] =
    useUpdateClassMutation();

  const [
    deleteClass,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteClassMutation();

  const {
    data: sections,
    isLoading: isLoadingSections,
    isSuccess: isSuccessSections,
    isError: isErrorSection,
    error: errorSection,
  } = useGetSectionsQuery("sectionsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();

  const [isDelLoading, setIsDelLoading] = useState(false);
  const [classname, setClassname] = useState(classObj.classname);
  const [tuition, setTuition] = useState(classObj.tuition);
  const [selectedSection, setSelectedSection] = useState(classObj.sectionId);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setIsDelLoading(false);
      setClassname("");
      setTuition("");
      setSelectedSection("");
      enqueueSnackbar(`Seccess`, { variant: "success" });
      navigate("/dash/settings/classes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  useEffect(() => {
    if (isError || isDelError){
      setIsDelLoading(false);
      enqueueSnackbar(`An Error occured`, { variant: "success" });
    }
  })

  const onClassnameChanged = (e) => setClassname(e.target.value);
  const handleSectionChange = (e) => setSelectedSection(e.target.value);
  const onTuitionChanged = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setTuition(parseInt(value));
    }
  };

  const onSaveClassClicked = async (e) => {
    await updateClass({
      id: classObj.id,
      classname: classname,
      sectionId: selectedSection,
      tuition: tuition,
    });
  };

  const onDeleteClassClicked = async () => {
    setIsDelLoading(true);
    await deleteClass({ id: classObj.id });
  };

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

  let canSave = !isLoading || !isLoadingSections ;

  const errClass =
    isError || isDelError || isErrorSection ? "errmsg" : "offscreen";

  const errContent =
    (error?.data?.message ||
      delerror?.data?.message ||
      errorSection?.data?.message) ??
    "";

  if (!classObj || isLoading || isLoadingSections || isDelLoading)
    return <PulseLoader color={"#FFF"} />;

  return (
    <Box m="20px">
      <Header title="Update Class" />

      <p className={errClass}>{errContent}</p>

      <form onSubmit={(e) => e.preventDefault()} style={{ background:colors.primary[400], padding: "25px", borderRadius: "10px", width: "70%", margin: "auto", justifyContent: "center", alignItems: "center"}} >
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

        <button
          className="submit-button"
          onClick={onSaveClassClicked}
          disabled={!canSave}
          style={{ marginLeft: "10rem"}}
        >
          Save
        </button>
        <Link to={"/dash/settings/classes"} style={{ marginLeft: "1rem"}} >
          <button className="submit-button" variant="contained" style={{backgroundColor: colors.grey[400]}}>
            Cancel
          </button>
        </Link>
        <button className="submit-button" onClick={onDeleteClassClicked} style={{marginLeft: "1rem", backgroundColor: colors.redAccent[400]}}>
          Delete
        </button>
      </form>
    </Box>
  );
};

export default EditClassForm;

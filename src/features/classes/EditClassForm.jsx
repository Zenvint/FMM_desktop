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

const EditClassForm = () => {
  const { id } = useParams();

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

  const [classname, setClassname] = useState(classObj.classname);
  const [tuition, setTuition] = useState(classObj.tuition);
  const [selectedSection, setSelectedSection] = useState(classObj.sectionId);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setClassname("");
      setTuition("");
      setSelectedSection("");
      navigate("/dash/settings/classes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

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

  let canSave = !isLoading || !isLoadingSections;

  const errClass =
    isError || isDelError || isErrorSection ? "errmsg" : "offscreen";

  const errContent =
    (error?.data?.message ||
      delerror?.data?.message ||
      errorSection?.data?.message) ??
    "";

  if (!classObj || isLoading || isLoadingSections)
    return <PulseLoader color={"#FFF"} />;

  return (
    <Box m="20px">
      <Header title="Update Class" />

      <p className={errClass}>{errContent}</p>

      <form onSubmit={(e) => e.preventDefault()}>
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
        >
          Save
        </button>
        <Link to={"/dash/settings/classes"}>
          <button className="submit-button" variant="contained">
            Cancel
          </button>
        </Link>
        <button className="submit-button" onClick={onDeleteClassClicked}>
          Delete
        </button>
      </form>
    </Box>
  );
};

export default EditClassForm;

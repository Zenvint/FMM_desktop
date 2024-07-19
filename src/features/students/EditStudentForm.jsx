import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import PulseLoader from "react-spinners/PulseLoader.js";
import { Formik } from "formik";
import Header from "../../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetStudentsQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation
} from "./studentsApiSlice.js";
import { useGetSectionsQuery } from "../sections/sectionsApiSlice.js";
import { useGetClassesQuery } from "../classes/classesApiSlice.js";
import { useSnackbar } from "notistack";

const EditStudentForm = () => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const { student } = useGetStudentsQuery("studentsList", {
    selectFromResult: ({ data }) => ({
      student: data?.entities[id],
    }),
  });

  const [updateStudent, { isLoading, isSuccess, isError, error }] =
    useUpdateStudentMutation();

  const [
    deleteStudent,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteStudentMutation();

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

  const {
    data: classes,
    isLoading: isLoadingClasses,
    isSuccess: isSuccessClasses,
    isError: isErrorClass,
    error: errorClass,
  } = useGetClassesQuery("classesList", {
    pollingInterval: 600000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });


  const [isDelLoading, setIsDelLoading] = useState(false);
  const [fullname, setFullname] = useState(student.fullname);
  const [sectionId, setSectionId] = useState(student.sectionId);
  const [classId, setClassId] = useState(student.classId);
  const [dob, setDob] = useState(student.dobformated);
  const [pob, setPob] = useState(student.pob);
  const [nationality, setNationality] = useState(student.nationality);
  const [gender, setGender] = useState(student.gender);
  const [parentname, setParentName] = useState(student.parentname);
  const [parentnumber, setParentNUmber] = useState(student.parentnumber);

  const onFullnameChanged = (e) => setFullname(e.target.value);
  const onSectionIdChanged = (e) => setSectionId(e.target.value);
  const onClassIdChanged = (e) => setClassId(e.target.value);
  const onDobChanged = (e) => setDob(e.target.value);
  const onPobChanged = (e) => setPob(e.target.value);
  const onNationalityChanged = (e) => setNationality(e.target.value);
  const onGenderChanged = (e) => setGender(e.target.value);
  const onParentnameChanged = (e) => setParentName(e.target.value);
  const onParentNumberChanged = (e) => setParentNUmber(e.target.value);

  const onSaveStudentClicked = async (e) => {
    e.preventDefault();
    await updateStudent({
        id: student.id,
        matricule: student.matricule,
        fullname,
        sectionId,
        classId,
        dob,
        pob,
        nationality,
        gender,
        parentname,
        parentnumber,
      })
  };

  const onDeleteSectionClicked = async () => {
    setIsDelLoading(true);
    await deleteStudent({ id: student.id });
  };

  

  useEffect(
    () => {
      if (isSuccess || isDelSuccess) {
        setIsDelLoading(false);
        setFullname("");
        setSectionId("");
        setClassId("");
        setDob("");
        setPob("");
        setNationality("");
        setGender("");
        setParentName("");
        setParentNUmber("");
        enqueueSnackbar(
          `Seccessful`,
          { variant: "success" }
        );
        navigate("/dash/students");
      }
    },
    [isSuccess, isDelSuccess,navigate],
    enqueueSnackbar
  );

  useEffect(() => {
    if (isError || isDelError) {
      setIsDelLoading(false);
      enqueueSnackbar("An Error occured", { variant: "error" });
    }
  }, [isError, isDelError, enqueueSnackbar]);

  const errClass =
    isErrorClass || isErrorSection || isError || isDelError  ? "errmsg" : "offscreen";

  if (isLoadingClasses || isLoadingSections || isLoading  || isDelLoading ) {
    return <PulseLoader color={"#FFF"} />;
  }

  let sectionsListOptions;
  if (isSuccessSections) {
    const { ids } = sections;
    const sectionsObject =
      ids?.length && ids.map((sectionId) => sections?.entities[sectionId]);
    sectionsListOptions =
      sectionsObject?.length &&
      sectionsObject.map((sectionObj) => (
        <option key={sectionObj.id} value={sectionObj.id}>
          {sectionObj.sectionname}
        </option>
      ));
  }

  let classesListOptions;
  if (isSuccessClasses) {
    const { ids } = classes;
    const classesObject =
      ids?.length && ids.map((classId) => classes?.entities[classId]);
    classesListOptions =
      classesObject?.length &&
      classesObject
        .filter((classObj) => {
          // Filter based on sectionId if it has a value
          if (sectionId) {
            return classObj.sectionId === sectionId;
          }
          return true; // Return all classes if sectionId is not provided
        })
        .map((classObj) => (
          <option key={classObj.id} value={classObj.id}>
            {classObj.classname}
          </option>
        ));
  }

  const errContent =
    (errorClass?.data?.message ||
      errorSection?.data?.message || error?.data?.message || delerror?.data?.message ) ??
    "";

  return (
    <Box m="20px">
      <Header title="New Student" />
      <Formik>
        <>
          <p className={errClass}>{errContent}</p>

          <form onSubmit={onSaveStudentClicked}>
            <div className="input-container">
              <label htmlFor="studentName">Full Name:</label>
              <input
                id="studentName"
                type="text"
                value={fullname}
                onChange={onFullnameChanged}
                placeholder="Enter the student name"
                required
              />
            </div>

            <div className="class_container">
              <div className="input-container">
                <label htmlFor="section" className="dropdown">
                  {" "}
                  Section:{" "}
                </label>
                <select
                  id="section"
                  placeholder="Select the section"
                  required
                  value={sectionId}
                  onChange={onSectionIdChanged}
                >
                  <option>Select A Section</option>
                  {sectionsListOptions}
                </select>
              </div>

              <div className="input-container">
                <label htmlFor="className" className="dropdown">
                  {" "}
                  Class:{" "}
                </label>
                <select
                  id="className"
                  placeholder="Select the className"
                  required
                  value={classId}
                  onChange={onClassIdChanged}
                >
                  <option>Select A Class</option>
                  {classesListOptions}
                </select>
              </div>
            </div>

            <div className="class_container">
              <div className="input-container">
                <label htmlFor="DoB" className="dropdown">
                  {" "}
                  Date of birth:{" "}
                </label>
                <input
                  id="DoB"
                  type="date"
                  value={dob}
                  onChange={onDobChanged}
                  placeholder="Enter date of birth"
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="PoB">Place of birth:</label>
                <input
                  id="PoB"
                  type="text"
                  value={pob}
                  onChange={onPobChanged}
                  placeholder="Enter place of birth"
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="nationality">Nationality:</label>
                <input
                  id="nationality"
                  type="text"
                  value={nationality}
                  onChange={onNationalityChanged}
                  placeholder="Enter nationality"
                  required
                />
              </div>
            </div>

            <div className="input-container">
              <label>Gender:</label>
              <div className="radio-container">
                <div>
                  <input
                    type="radio"
                    id="check-male"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={onGenderChanged}
                    style={{ height: "16px", width: "30px" }}
                  />
                  <label htmlFor="check-male" style={{ fontWeight: "100" }}>
                    {" "}
                    Male{" "}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="check-female"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={onGenderChanged}
                    style={{ height: "16px", width: "30px" }}
                  />
                  <label htmlFor="check-female" style={{ fontWeight: "100" }}>
                    {" "}
                    Female{" "}
                  </label>
                </div>
              </div>
            </div>

            <div className="input-container">
              <label htmlFor="parents">Parent Name:</label>
              <input
                id="parents"
                type="text"
                value={parentname}
                onChange={onParentnameChanged}
                placeholder="Enter the parent name"
                required
              />
            </div>

            <div className="class_container">
              <div className="input-container">
                <label htmlFor="phone">Parent phone number:</label>
                <input
                  id="phone"
                  type="tel"
                  value={parentnumber}
                  onChange={onParentNumberChanged}
                  placeholder="6 xx xx xx xx"
                  required
                />
              </div>
            </div>
            <Link to={"/dash/students"}>
              <button
                className="submit-button"
                type="cancel"
                variant="contained"
              >
                Cancel
              </button>
            </Link>
            <button className="submit-button" type="submit">
              Save
            </button>
            <button className="submit-button" onClick={onDeleteSectionClicked}>
              Delete
            </button>
          </form>
        </>
      </Formik>
    </Box>
  );
};

export default EditStudentForm;

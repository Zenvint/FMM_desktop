import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PulseLoader from "react-spinners/PulseLoader.js";
import { Formik } from "formik";
import Header from "../../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useGetStudentsQuery, useAddNewStudentMutation, } from "./studentsApiSlice.js";
import { useGetSectionsQuery } from "../sections/sectionsApiSlice.js";
import { useGetClassesQuery } from "../classes/classesApiSlice.js";
import { useSnackbar } from "notistack";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";


const NewStudentForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [addNewStudent, { isLoading, isSuccess, isError, error }] = useAddNewStudentMutation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  let matricule;
  const [fullname, setFullname] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [classId, setClassId] = useState("");
  const [dob, setDob] = useState("");
  const [pob, setPob] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [parentname, setParentName] = useState("");
  const [parentnumber, setParentNUmber] = useState("");

  const onFullnameChanged = (e) => setFullname(e.target.value);
  const onSectionIdChanged = (e) => setSectionId(e.target.value);
  const onClassIdChanged = (e) => setClassId(e.target.value);
  const onDobChanged = (e) => setDob(e.target.value);
  const onPobChanged = (e) => setPob(e.target.value);
  const onNationalityChanged = (e) => setNationality(e.target.value);
  const onGenderChanged = (e) => setGender(e.target.value);
  const onParentnameChanged = (e) => setParentName(e.target.value);
  const onParentNumberChanged = (e) => setParentNUmber(e.target.value);

  const { students } = useGetStudentsQuery("studentsList", {
    selectFromResult: ({ data }) => ({
      students: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  students.sort((a, b) => {
    if (a.matricule < b.matricule) {
      return -1;
    }
    if (a.matricule > b.matricule) {
      return 1;
    }
    return 0; // a.matricule is equal to b.matricule
  });

  const setUpMatricule = () => {
    const today = new Date();
    if (students) {
      const lastStudentMatricule = students[students.length - 1].matricule;
      const lastRegist = lastStudentMatricule.substring(7);
      const lastRegistInt = parseInt(lastRegist, 10);
      matricule = `FMM${today.getFullYear()}${lastRegistInt + 1}`;
      console.log(matricule);
    } else {
      matricule = `FMM${today.getFullYear()}${10001}`;
    }
  };

  

  const onSaveStudentClicked = async (e) => {
    e.preventDefault();
    setUpMatricule();
    await addNewStudent({
      matricule,
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

  useEffect(() => {
    if (isSuccess) {
      setFullname("")
      setSectionId("")
      setClassId("")
      setDob("")
      setPob("")
      setNationality("")
      setGender("")
      setParentName("")
      setParentNUmber("")
      enqueueSnackbar(`Student with matricule: ${matricule} added Seccessfully!`, { variant: "success" });
      navigate("/dash/students");
    }
  }, [isSuccess, navigate], enqueueSnackbar);

  useEffect(() => {
    if (isError){
      enqueueSnackbar("Could not add Student!", { variant: "error" });
    }
  }, [isError, enqueueSnackbar])

  const errClass =
    isErrorClass || isErrorSection || isError ? "errmsg" : "offscreen";

  if (isLoadingClasses || isLoadingSections || isLoading) {
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
      errorSection?.data?.message ||
      error?.data?.message) ??
    "";

  return (
    <Box m="20px">
      <Header title="New Student" />
      <Formik>
        <>
          <p className={errClass}>{errContent}</p>

          <form onSubmit={onSaveStudentClicked} style={{ background:colors.primary[400], padding: "25px", borderRadius: "10px", width: "70%", margin: "auto"}}>
            <div className="input-container" >
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
              <div className="input-container" style={{ marginBottom: "15px"}}>
                <label htmlFor="section" className="dropdown">
                  {" "}
                  Section:{" "}
                </label>
                <select
                  style={{height: "31px"}}
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
                  style={{height: "31px"}}
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
                  style={{height: "32px"}}
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
                  <label htmlFor="check-male" style={{ fontWeight: "300", color:colors.grey[100] }}>
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
                  <label htmlFor="check-female" style={{ fontWeight: "300", color: (colors.grey[100]) }}>
                    {" "}
                    Female{" "}
                  </label>
                </div>
              </div>
            </div>

            <div className="input-container" >
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
            <Link to={"/dash/students"} style={{ marginLeft: "9rem" }}>
              <button
                className="submit-button"
                type="cancel"
                variant="contained"
                style={{background:colors.grey[500]}}
              >
                Cancel
              </button>
            </Link>
            <button className="submit-button" type="submit" style={{ marginLeft: "1rem" }}>
              Save
            </button>
          </form>
        </>
      </Formik>
    </Box>
  );
};

export default NewStudentForm;

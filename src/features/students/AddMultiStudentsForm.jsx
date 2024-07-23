import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PulseLoader from "react-spinners/PulseLoader.js";
import { Formik } from "formik";
import Header from "../../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetStudentsQuery,
  useAddNewStudentMutation,
} from "./studentsApiSlice.js";
import { useGetSectionsQuery } from "../sections/sectionsApiSlice.js";
import { useGetClassesQuery } from "../classes/classesApiSlice.js";
import { useSnackbar } from "notistack";

import * as XLSX from "xlsx";

const AddMultiStudentsForm = () => {
  let lastRegistInt;
  let count = 0;
  let numStudent = 0;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [addNewStudent, { isLoading, isSuccess, isError, error }] =
    useAddNewStudentMutation();

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

  const [data, setData] = useState([]);
  const [sectionId, setSectionId] = useState("");
  const [classId, setClassId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const onSectionIdChanged = (e) => setSectionId(e.target.value);
  const onClassIdChanged = (e) => setClassId(e.target.value);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setData(json);
      };
      reader.readAsBinaryString(file);
    }
  };

  const { students } = useGetStudentsQuery("studentsList", {
    selectFromResult: ({ data }) => ({
      students: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (students) {
    const lastStudentMatricule = students[students.length - 1].matricule;
    const lastRegist = lastStudentMatricule.substring(7);
    lastRegistInt = parseInt(lastRegist, 10);
  }

  const setUpMatricule = () => {
    const today = new Date();
    if (students) {
      return `FMM${today.getFullYear()}${lastRegistInt + 1}`;
    } else {
      return `FMM${today.getFullYear()}${10001}`;
    }
  };

  const createNewStudent = async (matricule, student) => {
    await addNewStudent({
      matricule,
      fullname: student.fullname,
      sectionId,
      classId,
      dob: student.dob,
      pob: student.pob,
      nationality: student.nationality,
      gender: student.gender,
      parentname: student.parentname,
      parentnumber: student.parentnumber,
    });
  }

  const onSaveStudentClicked = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      numStudent = data.length;
      data.forEach( (student) => {
        const matricule = setUpMatricule();
        console.log(matricule);
        createNewStudent(matricule, student)
        count++;
        lastRegistInt += 1;
        console.log(lastRegistInt);
      });
    } else {
      alert("Please select a file.");
    }
  };

  useEffect(
    () => {
      if (isSuccess) {
        enqueueSnackbar(`added students Seccessfully!`, { variant: "success" });
        navigate('/dash/students')
      }
    },
    [isSuccess, navigate],
    enqueueSnackbar
  );

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Could not add Student!", { variant: "error" });
    }
  }, [isError, enqueueSnackbar]);

  const errClass =
    isErrorClass || isErrorSection || isError ? "errmsg" : "offscreen";

  if (isLoadingClasses || isLoadingSections || isLoading) {
    return (
      <div>
        {data.length && (
          <p>
            {count} of {numStudent} added{" "}
          </p>
        )}
        <PulseLoader color={"#FFF"} />
      </div>
    );
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

  const canSave = sectionId.length && classId.length;

  return (
    <Box m="20px">
      <Header title="New Student" />
      <Formik>
        <>
          <p className={errClass}>{errContent}</p>

          <form onSubmit={onSaveStudentClicked}>
            <div className="class_container">
              <div className="input-container">
                <label htmlFor="section" className="dropdown">
                  {" "}
                  Section:{" "}
                </label>
                <select
                  id="section"
                  placeholder="Select the section"
                  value={sectionId}
                  onChange={onSectionIdChanged}
                  required
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
                  value={classId}
                  onChange={onClassIdChanged}
                  required
                >
                  <option>Select A Class</option>
                  {classesListOptions}
                </select>
              </div>
            </div>

            <div className="class_container">
              <div style={{ display: "grid" }}>
                <label htmlFor="fileUpload">Upload an Excel file:</label>
                <input
                  type="file"
                  id="fileUpload"
                  name="fileUpload"
                  accept=".xls,.xlsx"
                  onChange={handleFileChange}
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
            <button className="submit-button" type="submit" disabled={!canSave}>
              Save
            </button>
          </form>
        </>
      </Formik>
    </Box>
  );
};

export default AddMultiStudentsForm;

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
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";

import * as XLSX from "xlsx";

const AddMultiStudentsForm = () => {
  let lastRegistInt;
  const [count, setCount] = useState(0);
  const [numStudent, setNumStudent] = useState(0)
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
  } else {
    lastRegistInt = 10000;
  }

  const setUpMatricule = () => {
    const today = new Date();

    return `FMM${today.getFullYear()}${lastRegistInt + 1}`;
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
  };

  const onSaveStudentClicked = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      setNumStudent(data?.length)
      data.forEach((student) => {
        const matricule = setUpMatricule();
        console.log(matricule);
        createNewStudent(matricule, student);
        const currentcount = count +1;
        setCount(currentcount);
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
        navigate("/dash/students");
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

          <form onSubmit={onSaveStudentClicked} style={{ background:colors.primary[400], padding: "25px", borderRadius: "10px", width: "60%", margin: "auto"}}>
            <div className="class_container">
              <div className="input-container" style={{ marginButton: "10px"}}>
                <label htmlFor="section" className="dropdown">
                  {" "}
                  Section:{" "}
                </label>
                <select
                  style={{height: "27px"}}
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

              <div className="input-container" style={{ marginButton: "10px"}}>
                <label htmlFor="className" className="dropdown">
                  {" "}
                  Class:{" "}
                </label>
                <select
                  style={{height: "27px"}}
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

            <div className="class_container" style={{ marginTop: "15px"}}>
              <div style={{ display: "grid" }}>
                <label htmlFor="fileUpload" style={{ fontWeight: "bold" }}>Upload an Excel file:</label>
                <input
                  type="file"
                  id="fileUpload"
                  name="fileUpload"
                  accept=".xls,.xlsx"
                  onChange={handleFileChange}
                  required
                  style={{ background: "none", border: "none", cursor: "pointer", width: "100%", height: "30px" }}
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
            <button className="submit-button" type="submit" disabled={!canSave} style={{ marginLeft: "1rem", cursor: "pointer" }}>
              Save
            </button>
          </form>
        </>
      </Formik>
    </Box>
  );
};

export default AddMultiStudentsForm;

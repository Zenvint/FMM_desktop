/** @format */
import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUpdateSectionMutation, useDeleteSectionMutation, useGetSectionsQuery } from "./sectionsApiSlice.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader.js";
import { useSnackbar } from "notistack";
import { useTheme } from "@mui/material";
import { tokens } from "../../hooks/theme.js";


const EditSectionForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { section } = useGetSectionsQuery("sectionsList", {
    selectFromResult: ({ data }) => ({
      section: data?.entities[id],
    }),
  });

  //   useEffect(()=> {console.log(section)}, [section])

  const [updateSection, { isLoading, isSuccess, isError, error }] =
    useUpdateSectionMutation();

  const [
    deleteSection,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteSectionMutation();

  const navigate = useNavigate();

  const [isDelLoading, setIsDelLoading] = useState(false);
  const [sectionname, setSectionname] = useState(section.sectionname);


  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setIsDelLoading(false)
      enqueueSnackbar(`Seccess`, { variant: "success" });
      setSectionname("");
      navigate("/dash/settings/sections");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  useEffect(() => {
    if(isError || isDelError){
      setIsDelLoading(false)
      enqueueSnackbar(`An Error occured`, { variant: "error" });
    }
  }, [isError, isDelError])

  const onSectionnameChanged = (e) => setSectionname(e.target.value);



  const onSaveSectionClicked = async (e) => {
      await updateSection({ id: section.id, sectionname});
  };

  const onDeleteSectionClicked = async () => {
    setIsDelLoading(true)
    await deleteSection({ id: section.id });
  };


  let canSave = !isLoading;
  

  const errClass = isError || isDelError ? "errmsg" : "offscreen";


  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  if (!section || isLoading || isDelLoading) return <PulseLoader color={"orange"} />;

  return (
    <Box m="20px">
      <Header title="Update Section" />

      <p className={errClass}>{errContent}</p>

      <form onSubmit={(e) => e.preventDefault()} style={{ background:colors.primary[400], padding: "25px", borderRadius: "10px", width: "70%", margin: "auto", justifyContent: "center", alignItems: "center"}} >
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

        <button
          className="submit-button"
          onClick={onSaveSectionClicked}
          disabled={!canSave}
          style={{marginLeft: "10rem"}}
        >
          Save
        </button>
        <Link to={"/dash/settings/sections"} style={{ marginLeft: "1rem"}}>
          <button className="submit-button" variant="contained" style={{backgroundColor: colors.grey[400]}}>
            Cancel
          </button>
        </Link>
        <button className="submit-button" onClick={onDeleteSectionClicked} style={{marginLeft: "1rem", backgroundColor: colors.redAccent[400]}}>
          Delete
        </button>
      </form>
    </Box>
  );
};

export default EditSectionForm;

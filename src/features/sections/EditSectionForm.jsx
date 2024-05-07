/** @format */
import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUpdateSectionMutation, useDeleteSectionMutation, useGetSectionsQuery } from "./sectionsApiSlice.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader.js";

const EditSectionForm = () => {
  const { id } = useParams();

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

  const [sectionname, setSectionname] = useState(section.sectionname);


  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setSectionname("");
      navigate("/dash/settings/sections");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onSectionnameChanged = (e) => setSectionname(e.target.value);



  const onSaveSectionClicked = async (e) => {
      await updateSection({ id: section.id, sectionname});
  };

  const onDeleteSectionClicked = async () => {
    await deleteSection({ id: section.id });
  };


  let canSave = !isLoading;
  

  const errClass = isError || isDelError ? "errmsg" : "offscreen";


  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  if (!section || isLoading) return <PulseLoader color={"#FFF"} />;

  return (
    <Box m="20px">
      <Header title="Update Section" />

      <p className={errClass}>{errContent}</p>

      <form onSubmit={(e) => e.preventDefault()}>
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
        >
          Save
        </button>
        <Link to={"/dash/settings/sections"}>
          <button className="submit-button" variant="contained">
            Cancel
          </button>
        </Link>
        <button className="submit-button" onClick={onDeleteSectionClicked}>
          Delete
        </button>
      </form>
    </Box>
  );
};

export default EditSectionForm;

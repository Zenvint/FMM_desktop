/** @format */
import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../hooks/theme.js";
import Header from "../../components/Header.jsx";
import { useTheme } from "@mui/material";
import { AddBtn } from "../../components/Button.jsx";
import { Link } from "react-router-dom";
import { useGetSectionsQuery } from "./sectionsApiSlice.js";
import {SectionTableColumns } from "../../configs/tableColumns.js";
import PulseLoader from "react-spinners/PulseLoader";
import { useState, useEffect } from "react";

const Sections = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  //   useEffect(() => {
  // 	console.log(selectedRows[0])
  //   }, [selectedRows])

  const canEdit = selectedRows.length == 1;

  const {
    data: sections,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSectionsQuery("sectionsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = sections;
    const tableContent =
      ids?.length && ids.map((userId) => sections?.entities[userId]);

    content = (
      <Box m="8px">
        <Header title="Sections" subtitle="List of all Sections." />
        <Box display={"flex"}>
          <Link to="/dash/settings/sections/new">
            <AddBtn btnName="+ Add Section" />
          </Link>
          <Link to={`/dash/settings/sections/${selectedRows[0]}`}>
            <AddBtn btnName="Edit" enabled={!canEdit} />
          </Link>
        </Box>
        <Box
          m="0 0 0"
          height="73vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[100],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[800],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[800],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.blueAccent[200]} `,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]}`,
            },
          }}
        >
          <DataGrid
            marginTop={"5rem"}
            rows={tableContent}
            columns={SectionTableColumns}
            components={{ Toolbar: GridToolbar }}
            checkboxSelection
            onSelectionModelChange={handleSelectionModelChange}
            selectionModel={selectedRows}
          />
        </Box>
      </Box>
    );
  }

  return content;
};

export default Sections;

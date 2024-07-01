/** @format */
import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../hooks/theme.js";
import Header from "../../components/Header.jsx";
import { useTheme } from "@mui/material";
import { AddBtn } from "../../components/Button.jsx";
import { Link } from "react-router-dom";
import { useGetStudentsQuery } from "./studentsApiSlice.js";
import {StudentTableColumns } from "../../configs/tableColumns.js";
import PulseLoader from "react-spinners/PulseLoader";
import { useState } from "react";


const Students = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const canEdit = selectedRows.length == 1;

  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStudentsQuery("studentsList", {
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
    const { ids } = students;
    const tableContent =
      ids?.length && ids.map((userId) => students?.entities[userId]);

    content = (
      <Box m="8px">
        <Header title="Students" subtitle="List of all Students." />
        <Box display={"flex"}>
          <Link to="/dash/students/new">
            <AddBtn btnName="+ Add Student" />
          </Link>
          <Link to={`/dash/students/${selectedRows[0]}`}>
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
            columns={StudentTableColumns}
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

export default Students;

import React from 'react'
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../hooks/theme.js";
import Header from "../../components/Header.jsx";
import { useTheme } from "@mui/material";
import { AddBtn } from "../../components/Button.jsx";
import { Link } from "react-router-dom";
import { useGetClassesQuery } from './classesApiSlice.js';
import {ClassTableColumns } from "../../configs/tableColumns.js";
import PulseLoader from "react-spinners/PulseLoader";
import { useState, useEffect } from "react";

const Classes = () => {
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
      data: classes,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetClassesQuery("classesList", {
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
      const { ids } = classes;
      const tableContent =
        ids?.length && ids.map((classId) => classes?.entities[classId]);
  
      content = (
        <Box m="8px">
          <Header title="Classes" subtitle="List of all Classes." />
          <Box display={"flex"}>
            <Link to="/dash/settings/classes/new">
              <AddBtn btnName="+ Add Class" />
            </Link>
            <Link to={`/dash/settings/classes/${selectedRows[0]}`}>
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
              columns={ClassTableColumns}
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
}

export default Classes
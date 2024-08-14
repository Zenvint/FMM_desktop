import React from "react";
import { useState } from "react";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header.jsx";
import { Box, Button } from "@mui/material";
import {  SalaryTableColumns } from "../../configs/tableColumns";
import { AddBtn } from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useGetSalariesQuery } from "./salaryApiSlice.js";
import PulseLoader from "react-spinners/PulseLoader.js";

const Salaries = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    data: salaries,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSalariesQuery("salariesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const handleEdit = () => {
    navigate(`/dash/finance/salaries/pay/${selectedRows[0]}`);
  };

  const handleDetails = () => {
    navigate(`/dash/finance/salaries/details/${selectedRows[0]}`);
  };

  const canEdit = selectedRows?.length == 1;

 

  let content;

  if (isLoading) {
    content = <PulseLoader color={"#FFF"} />;
  }

  if (isError) {
    content = (
      <Box m="0 0 0" display={"grid"} justifyItems={"center"}>
        <p className="errmsg">{error?.data?.message}</p>
      </Box>
    );
  }

  if (isSuccess) {
    const { ids } = salaries;
    const tableContent =
      ids?.length && ids.map((salaryId) => salaries?.entities[salaryId]);
    content = (
      <DataGrid
        rows={tableContent}
        columns={SalaryTableColumns}
        components={{ Toolbar: GridToolbar }}
        checkboxSelection
        onSelectionModelChange={handleSelectionModelChange}
        selectionModel={selectedRows}
      />
    );
  }

  return (
    <Box m="10px">
      <Header title="Salaries" subtitle="Managing Staff Salaries" />

      <Box
        m="0 0 0 0"
        height="76vh"
        width={"100%"}
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
            color: `${colors.blueAccent[200]}`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]}`,
          },
        }}
      >
        <Box display={"flex"} justifyContent={"space-between"} marginTop={"25px"}>
          <Box width={"30vw"} display={"flex"} justifyContent={"space-around"}>
            <AddBtn
              btnName="Pay Salary"
              enabled={!canEdit}
              handleEdit={handleEdit}
            />

            <AddBtn
              btnName="Details"
              enabled={!canEdit}
              handleEdit={handleDetails}
            />
          </Box>

          <Box display={"flex"} mb={"-5px"} justifyContent={"center"}>
          
          </Box>
        </Box>

        {content}
      </Box>
    </Box>
  );
};

export default Salaries;

/** @format */

import React from "react";
import { useState } from "react";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header.jsx";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { AddBtn } from "../../components/Button.jsx";
import { InstallmentsTableColumns } from "../../configs/tableColumns.js";
import { useGetInstallmentsQuery } from "./installmentsApiSlice.js";
import PulseLoader from "react-spinners/PulseLoader.js";

const Installments = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const canEdit = selectedRows.length == 1;

  const handleEdit = () => {
    navigate(`/dash/settings/installments/${selectedRows[0]}`);
  };


  const {
    data: installments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetInstallmentsQuery("installmentsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = (
      <Box m="8px">
        <Header title="Installments" subtitle="List of all Intallments." />
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Link to={"/dash/installments"} style={{ color: colors.grey[100] }}>
            <ArrowBackOutlinedIcon className="li_icon" />
          </Link>
          <Box display={"flex"}>
            <AddBtn btnName="Edit" handleEdit={handleEdit} enabled={!canEdit} />
          </Box>
        </Box>

        <Box m="0 0 0" display={"grid"} justifyItems={"center"}>
          <p className="errmsg">{error?.data?.message}</p>
        </Box>
      </Box>
    );
  }

  if (isSuccess) {
    const { ids } = installments;
    const tableContent =
      ids?.length && ids.map((installmentId) => installments?.entities[installmentId]);

    content = (
      <Box m={"10px"}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Header title="Installments" subtitle="List of all Intallments." />
            <Link to={"/dash/settings"} style={{ color: colors.grey[100] }}>
              <ArrowBackOutlinedIcon className="li_icon" />
            </Link>
          </Box>
          <Box
          display={"flex"}
          flexDirection={"row"}
          marginTop={"2rem"}
        >
          <Box display={"flex"}>
            <AddBtn btnName="Edit" handleEdit={handleEdit} enabled={!canEdit} />
          </Box>
        </Box>
        <Box
          m="0 0 0"
          height="75vh"
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
            columns={InstallmentsTableColumns}
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

export default Installments;

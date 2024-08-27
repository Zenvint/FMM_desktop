import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../hooks/theme.js";
import Header from "../../components/Header.jsx";
import { useTheme } from "@mui/material";
import { AddBtn } from "../../components/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useGetClassesQuery } from "./classesApiSlice.js";
import { ClassTableColumns } from "../../configs/tableColumns.js";
import PulseLoader from "react-spinners/PulseLoader";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useState, } from "react";

const Classes = () => {
  const navigate  = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const handleEdit = () => {
    navigate(`/dash/settings/classes/${selectedRows[0]}`);
  };

  const handleAdd = () => {
    navigate("/dash/settings/classes/new");
  };

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
    content = (
      <Box m="8px">
        <Header title="Classes" subtitle="List of all Classes." />
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Link to={"/dash/settings"} style={{ color: colors.grey[100] }}>
            <ArrowBackOutlinedIcon className="li_icon" />
          </Link>
          <Box display={"flex"}>
            <AddBtn handleEdit={handleAdd} btnName="+ Add Section" />

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
    const { ids } = classes;
    const tableContent =
      ids?.length && ids.map((classId) => classes?.entities[classId]);

    content = (
      <Box m="8px">
        <Box display={"flex"} justifyContent={"space-between"}>
          <Header title="Classes" subtitle="List of all Classes." />
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
            <AddBtn handleEdit={handleAdd} btnName="+ Add Section" />

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
};

export default Classes;

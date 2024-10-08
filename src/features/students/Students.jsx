/** @format */
import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../hooks/theme.js";
import Header from "../../components/Header.jsx";
import { useTheme } from "@mui/material";
import { AddBtn } from "../../components/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useGetStudentsQuery } from "./studentsApiSlice.js";
import { StudentTableColumns } from "../../configs/tableColumns.js";
import PulseLoader from "react-spinners/PulseLoader";
import { useState } from "react";

const Students = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const handleEdit = () => {
    navigate(`/dash/students/${selectedRows[0]}`);
  };

  const handleDismiss = () => {
    navigate(`/dash/students/dismiss/${selectedRows[0]}`);
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

  if (isLoading) content = <PulseLoader color={"orange"} />;

  if (isError) {
    content = (
      <Box m="10px">
        <Header title="Students" subtitle="List of all Students." />
        <Box display={"flex"} width={"50vw"}>
          <Link to="/dash/students/new">
            <AddBtn btnName="+ Add Student" />
          </Link>

          <AddBtn btnName="Edit" enabled={!canEdit} handleEdit={handleEdit} />
          <AddBtn
            btnName="Dismiss"
            enabled={!canEdit}
            handleEdit={handleDismiss}
          />

          <Link to="/dash/students/newmulti">
            <AddBtn btnName=" + Add Multiple Student" />
          </Link>
        </Box>

        <Box m="0 0 0" display={"grid"} justifyItems={"center"}>
          <p className="errmsg">{error?.data?.message}</p>
        </Box>
      </Box>
    );
  }

  if (isSuccess) {
    const { ids } = students;
    const tableContent =
      ids?.length && ids.map((userId) => students?.entities[userId]);

    tableContent.sort((a, b) => {
      if (a.matricule < b.matricule) {
        return -1;
      }
      if (a.matricule > b.matricule) {
        return 1;
      }
      return 0; // a.matricule is equal to b.matricule
    });

    content = (
      <Box m="10px">
        <Header title="Students" subtitle="List of all Students." />

        <Box display={"flex"} width={"50vw"} marginTop={"30px"}>
          <Link to="/dash/students/new">
            <AddBtn btnName="+ Add Student" />
          </Link>

          <AddBtn btnName="Edit" enabled={!canEdit} handleEdit={handleEdit} />
          <AddBtn
            btnName="Dismiss"
            enabled={!canEdit}
            handleEdit={handleDismiss}
          />

          <Link to="/dash/students/newmulti">
            <AddBtn btnName=" + Add Multiple Student" />
          </Link>
        </Box>
        <Box
          m="0 0 0"
          height="75.5vh"
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
            sortModel={[
              {
                field: "matricule",
                sort: "desc",
              }
            ]}
          />
        </Box>
      </Box>
    );
  }

  return content;
};

export default Students;

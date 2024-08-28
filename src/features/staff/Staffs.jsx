import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../hooks/theme.js";
import Header from "../../components/Header.jsx";
import { useTheme } from "@mui/material";
import { AddBtn } from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useGetStaffsQuery } from "./staffsApiSlice.js";
import {StaffTableColumns } from "../../configs/tableColumns.js";
import PulseLoader from "react-spinners/PulseLoader";
import { useState } from "react";

const Staffs = () => {
    const navigate  = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectedRows, setSelectedRows] = useState([]);
  
    const handleSelectionModelChange = (selectionModel) => {
      setSelectedRows(selectionModel);
    };
  
    const handleEdit = () => {
      navigate(`/dash/staff/${selectedRows[0]}`);
    };
  
    const handleAdd = () => {
      navigate("/dash/staff/new");
    };
  
    const canEdit = selectedRows.length == 1;
  
    const {
      data: staffs,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetStaffsQuery("staffsList", {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });
  
    let content;
  
    if (isLoading) content = <PulseLoader color={"orange"} />;
  
    if (isError) {
      content = (
        <Box m="8px">
          <Header title="Staff" subtitle="List of all Staff." />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"}>
              <AddBtn handleEdit={handleAdd} btnName="+ Add Staff" />
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
      const { ids } = staffs;
      const tableContent =
        ids?.length && ids.map((staffId) => staffs?.entities[staffId]);
  
      content = (
        <Box m="8px">
          <Header title="Staff" subtitle="List of all Staff." />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            marginTop={"30px"}
          >
            <Box display={"flex"}>
              <AddBtn handleEdit={handleAdd} btnName="+ Add Staff" />
              <AddBtn btnName="Edit" handleEdit={handleEdit} enabled={!canEdit} />
            </Box>
          </Box>
          <Box
            m="0 0 0"
            height="76.25vh"
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
              columns={StaffTableColumns}
              components={{ Toolbar: GridToolbar }}
              checkboxSelection
              onSelectionModelChange={handleSelectionModelChange}
              selectionModel={selectedRows}
              sortModel={[
                {
                  field: "createdAt",
                  sort: "desc",
                }
              ]}
            />
          </Box>
        </Box>
      );
    }
  
    return content;
}

export default Staffs
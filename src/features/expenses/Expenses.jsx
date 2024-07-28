import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../hooks/theme.js";
import Header from "../../components/Header.jsx";
import { useTheme } from "@mui/material";
import { AddBtn } from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useGetExpensesQuery } from "./expensesApiSlice.js";
import {ExpenseTableColumns } from "../../configs/tableColumns.js";
import PulseLoader from "react-spinners/PulseLoader";
import { useState, } from "react";

const Expenses = () => {
    const navigate  = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectedRows, setSelectedRows] = useState([]);
  
    const handleSelectionModelChange = (selectionModel) => {
      setSelectedRows(selectionModel);
    };
  
    const handleEdit = () => {
      navigate(`/dash/finance/expenses/${selectedRows[0]}`);
    };
  
    const handleAdd = () => {
      navigate("/dash/finance/expenses/new");
    };
  
    const canEdit = selectedRows.length == 1;
  
    const {
      data: expenses,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetExpensesQuery("expensesList", {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });
  
    let content;
  
    if (isLoading) content = <PulseLoader color={"#FFF"} />;
  
    if (isError) {
      content = (
        <Box m="8px">
          <Header title="Expenses" subtitle="List of all Classes." />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"}>
              <AddBtn handleEdit={handleAdd} btnName="+ Add Expenses" />
  
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
      const { ids } = expenses;
      const tableContent =
        ids?.length && ids.map((expenseId) => expenses?.entities[expenseId]);
  
      content = (
        <Box m="8px">
          <Header title="Expenses" subtitle="List of all Expenses." />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"}>
              <AddBtn handleEdit={handleAdd} btnName="+ Add Expenses" />
  
              <AddBtn btnName="Edit" handleEdit={handleEdit} enabled={!canEdit} />
            </Box>
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
              columns={ExpenseTableColumns}
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

export default Expenses
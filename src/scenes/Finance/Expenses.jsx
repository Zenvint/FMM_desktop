import * as React from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import ExpenceForm from "../../components/ExpenceForm";
import { Add } from "@mui/icons-material";
import BudgetForm from "../../components/BudgetForm";


export const Expenses = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        // { field: "id", headerName: "ID" },
        {
            field: "beneficiaryName",
            headerName: "BENEFICIARY NAME",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "description",
            headerName: "DESCRIPTION",
            flex: 1,
            Editable: true,
        },
        {
            field: "amount",
            headerName: "AMOUNT",
            flex: 1,
            Editable: true,
        },
        {
            field: "date",
            headerName: "DATE",
            flex: 1,                
        },
    ]

    return (
      <Box m="10px">
        <Header title="EXPENSES" subtitle="List of expenses" />
        <Box
          m="10px 0 0 0"
          height="74vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none"
            },
            "& .name-column--cell": {
              color: colors.greenAccent[100]
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[800],
              borderBottom: "none"
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400]
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[800]
            },
            "& .MuiCheckbox-root": {
              color: `${colors.blueAccent[200]} `
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]}`
            }
          }}
        >

          <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} mt={"-1rem"} mb={"-1.5rem"}>
            <Box display={"flex"} >
              <Box display={"flex"}>
                <ExpenceForm btn={"new Expense"} icon={<Add />} title={"NEW EXPENSE"}  />
              </Box>
              <Box display={"flex"} >
                <BudgetForm btn={"set Budget"} icon={<Add />} title={"SET BUDGET"} />
              </Box>
            </Box>
            <Box display={"flex"} gap={"3rem"} justifyContent={"end"} marginTop={"-1rem"} >
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "0rem"}}>
                <h5 style={{position: "relative", marginRight: "2rem"}}>ANNUAL BUDGET:</h5>
                <h4 style={{color: colors.greenAccent[400], marginTop: "-20px", fontWeight: "bold", backgroundColor: colors.primary[400], width: "100px", textAlign: "center", borderRadius: "5px", height: "30px", alignItems: "center", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 5px", alignContent: "center"}}>750,000</h4>
              </div>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "0rem"}}>
                <h5 style={{position: "relative", marginRight: "1rem"}}>AMOUNT SPENT:</h5>
                <h4 style={{color: colors.greenAccent[400], marginTop: "-20px", fontWeight: "bold", backgroundColor: colors.primary[400], width: "100px", textAlign: "center", borderRadius: "5px", height: "30px", alignItems: "center", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 5px", alignContent: "center"}}>500,000</h4>
              </div>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "0rem"}}>
                <h5 style={{position: "relative", marginRight: "1rem"}}>BALANCE:</h5>
                <h4 style={{color: colors.greenAccent[400], marginTop: "-20px", fontWeight: "bold", backgroundColor: colors.primary[400], width: "100px", textAlign: "center", borderRadius: "5px", height: "30px", alignItems: "center", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 5px", alignContent: "center"}}>250,000</h4>
              </div>
            </Box>
          </Box>

          <DataGrid
            rows={""}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Box>
    );
}
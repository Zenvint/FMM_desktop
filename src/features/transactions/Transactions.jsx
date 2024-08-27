import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../hooks/theme.js";
import Header from "../../components/Header.jsx";
import { useTheme } from "@mui/material";
import { useGetTransactionsQuery } from "./transactionApiSlice.js";
import { TransactionTableColumns } from "../../configs/tableColumns.js";
import PulseLoader from "react-spinners/PulseLoader";


const Transactions = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const {
      data: transactions,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetTransactionsQuery("transactionsList", {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });
  
    let content;
  
    if (isLoading) content = <PulseLoader color={"#FFF"} />;
  
    if (isError) {
      content = (
        <Box m="8px">
          <Header title="Transaction" subtitle="List of all Transactions." />
  
          <Box m="0 0 0" display={"grid"} justifyItems={"center"}>
            <p className="errmsg">{error?.data?.message}</p>
          </Box>
        </Box>
      );
    }
  
    if (isSuccess) {
      const { ids } = transactions;
      const tableContent =
        ids?.length && ids.map((transactionId) => transactions?.entities[transactionId]);
  
      content = (
        <Box m="8px">
          <Header title="Transactions" subtitle="List of all Transactions." />
          <Box
            m="0 0 0"
            height="79vh"
            marginTop={"30px"}
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
              columns={TransactionTableColumns}
              components={{ Toolbar: GridToolbar }}
              checkboxSelection
              sortModel={[{ field: "createdAt", sort: "desc" }]}
            />
          </Box>
        </Box>
      );
    }
  
    return content;
}

export default Transactions
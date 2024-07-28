import React from "react";
import { useState } from "react";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header.jsx";
import { Box, Button } from "@mui/material";
import { FeeTableColumns } from "../../configs/tableColumns";
import { AddBtn } from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useGetFeesQuery } from "./feesApiSlice.js";
import PulseLoader from "react-spinners/PulseLoader.js";

const Fees = () => {
  const navigate = useNavigate();
  const schoolFee = [];
  const registrationFee = [];
  const examinationFee = [];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentTable, setCurrentTable] = useState("schoolFees");
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    data: fees,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFeesQuery("feesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const handleEdit = () => {
    navigate(`/dash/finance/fees/pay/${selectedRows[0]}`);
  };

  const handleDetails = () => {
    navigate(`/dash/finance/fees/details/${selectedRows[0]}`);
  };

  const handleDiscount = () => {
    navigate(`/dash/finance/fees/discount/${selectedRows[0]}`);
  };

  const handleRegistration = () => {
    navigate(`/dash/finance/fees/registration/${selectedRows[0]}`);
  };

  const canEdit = selectedRows?.length == 1;

  const handleTableChange = (table) => {
    setCurrentTable(table);
  };

  let rows;
  switch (currentTable) {
    case "schoolFees":
      rows = schoolFee;
      break;
    case "registrationFees":
      rows = registrationFee;
      break;
    case "examinationFees":
      rows = examinationFee;
      break;
    default:
      rows = schoolFee;
  }

  const buttonStyles = (isActive) => ({
    backgroundColor: isActive ? colors.primary[400] : "transparent",
    color: isActive ? colors.blueAccent[400] : colors.grey[100],
    border: isActive ? `0 solid ${colors.primary[400]}` : "none",
    "&:hover": {
      backgroundColor: isActive ? colors.primary[400] : colors.blueAccent[800],
    },
  });

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
    const { ids } = fees;
    const tableContent =
      ids?.length && ids.map((feeId) => fees?.entities[feeId]);
    content = (
      <DataGrid
        rows={tableContent}
        columns={FeeTableColumns}
        components={{ Toolbar: GridToolbar }}
        checkboxSelection
        onSelectionModelChange={handleSelectionModelChange}
        selectionModel={selectedRows}
      />
    );
  }

  return (
    <Box m="10px">
      <Header title="Tuition Fee" subtitle="Managing the tuitions Fee" />

      <Box
        m="0 0 0 0"
        height="73vh"
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
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box width={"30vw"} display={"flex"} justifyContent={"space-around"}>
            <AddBtn
              btnName="Pay Fee"
              enabled={!canEdit}
              handleEdit={handleEdit}
            />
            <AddBtn
              btnName="Pay Registration"
              enabled={!canEdit}
              handleEdit={handleRegistration}
            />
            <AddBtn
              btnName="Manage Discount"
              enabled={!canEdit}
              handleEdit={handleDiscount}
            />

            <AddBtn
              btnName="Details"
              enabled={!canEdit}
              handleEdit={handleDetails}
            />
          </Box>

          <Box display={"flex"} mb={"-5px"} justifyContent={"center"}>
            <Button
              variant={currentTable === "schoolFees" ? "contained" : "outlined"}
              onClick={() => handleTableChange("schoolFees")}
              sx={buttonStyles(currentTable === "schoolFees")}
            >
              School Fees
            </Button>
            <Button
              variant={
                currentTable === "registrationFees" ? "contained" : "outlined"
              }
              onClick={() => handleTableChange("registrationFees")}
              sx={buttonStyles(currentTable === "registrationFees")}
            >
              Registration Fees
            </Button>
            <Button
              variant={
                currentTable === "examinationFees" ? "contained" : "outlined"
              }
              onClick={() => handleTableChange("examinationFees")}
              sx={buttonStyles(currentTable === "examinationFees")}
            >
              Examination Fees
            </Button>
          </Box>
        </Box>

        {content}
      </Box>
    </Box>
  );
};

export default Fees;

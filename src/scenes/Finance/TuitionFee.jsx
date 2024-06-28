import * as React from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, Button } from "@mui/material";
import PayFeeForm from "../../components/payFeeForm";
import AddCardIcon from '@mui/icons-material/AddCard';
import { studentList } from "../../data/mockData";

const schoolFee = studentList;
const registrationFee = studentList;
const examinationFee = studentList;

const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "studentName",
    headerName: "NAME",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "class",
    headerName: "CLASS",
    flex: 1,
  },
  {
    field: "totalFee",
    headerName: "TOTAL FEE",
    flex: 1,
  },
  {
    field: "discount",
    headerName: "DISCOUNT",
    flex: 1,
    editable: true
  },
  {
    field: "feePaied",
    headerName: "FEE PAID",
    flex: 1,
  },
  {
    field: "balance",
    headerName: "BALANCE",
    flex: 1,
  },
  {
    field: "status",
    headerName: "STATUS",
    flex: 1,
  },
];

export const TuitionFee = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentTable, setCurrentTable] = React.useState("schoolFees");

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
    '&:hover': {
      backgroundColor: isActive ? colors.primary[400] : colors.blueAccent[800],
    },
    
  });

  return (
    <Box m="10px">
      <Header title="Tuition Fee" subtitle="Managing the tuitions Fee" />

      <Box
        m="0 0 0 0"
        height="73vh"
        width={"100%"}
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
            color: `${colors.blueAccent[200]}`
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]}`
          }
        }}
      >
        <Box display={"flex"}>
          <Box display="flex">
            <PayFeeForm
              btn={"Pay Fee"}
              title={"Pay Fee"}
              icon={<AddCardIcon sx={{ mr: 1, width: "18px", ml: 0.5 }} />}
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

        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}
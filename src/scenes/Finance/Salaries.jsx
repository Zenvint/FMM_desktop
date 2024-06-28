import * as React from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import { staffList } from "../../data/mockData";



function countTotalStaff(staffList) {
    return staffList.length;
}
const totalStaff = countTotalStaff(staffList);
const formattedStaff = totalStaff.toLocaleString();

function sumTotalSalaries(staffList) {
    return staffList.reduce((total, staff) => total + staff.salary, 0);
}
function formatSalary(amount) {
    return amount.toLocaleString();
}
const totalSalaries = sumTotalSalaries(staffList);
const formattedSalaries = formatSalary(totalSalaries);


export const Salaries = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const columns = [
		{ field: "id", headerName: "ID", flex: 0.5 },
		{
			field: "name",
			headerName: "NAME",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "role",
			headerName: "ROLE",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "salary",
			headerName: "SALARY",
			flex: 1,
			cellClassName: "name-column--cell",
            editable: true,
		},
		{
			field: "phone",
			headerName: "PHONE No",
			flex: 1,
			cellClassName: "name-column--cell"
		},
	];

	return (
		<Box m="8px">
			<Header title="STAFF SALARIES" subtitle="Manage staff salaries" />
			<Box
				m="0 0 0"
				height="66vh"
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
						color: `${colors.blueAccent[400]} `
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${colors.grey[100]}`
					}
				}}>
				<Box display={"flex"} gap={"3rem"} justifyContent={"end"} marginTop={"-1rem"} >
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "0rem"}}>
                        <h5 style={{position: "relative", marginRight: "2rem"}}>TOTAL STAFF:</h5>
                        <h4 style={{color: colors.greenAccent[400], marginTop: "-20px", fontWeight: "bold", backgroundColor: colors.primary[400], width: "100px", textAlign: "center", borderRadius: "5px", height: "30px", alignItems: "center", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 5px", alignContent: "center"}}>{formattedStaff}</h4>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "0rem"}}>
                        <h5 style={{position: "relative", marginRight: "1rem"}}>TOTAL SALARIES:</h5>
                        <h4 style={{color: colors.greenAccent[400], marginTop: "-20px", fontWeight: "bold", backgroundColor: colors.primary[400], width: "100px", textAlign: "center", borderRadius: "5px", height: "30px", alignItems: "center", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 5px", alignContent: "center"}}>{formattedSalaries}</h4>
                    </div>
				</Box>

				<DataGrid
					marginTop={"5rem"}
					rows={staffList}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
				/>
			</Box>
		</Box>
	);
};

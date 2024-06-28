/** @format */
import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import StaffForm from "../../components/staffForm";
import DismissForm from "../../components/dismissForm";
import { staffList } from "../../data/mockData";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';



const Staff = () => {
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
			field: "gender",
			headerName: "GENDER",
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
			field: "email",
			headerName: "EMAIL",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "phone",
			headerName: "PHONE No",
			flex: 1,
			cellClassName: "name-column--cell"
		}
	];

	return (
		<Box m="8px">
			<Header title="STAFF" subtitle="List of all staff." />
			<Box
				m="0 0 0"
				height="73vh"
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
				<Box display={"flex"} ml={-3} >
					<StaffForm btn={"add staff"} icon={<PersonAddIcon />} title={"Staff Registration"} />
					<StaffForm btn={"edit"} icon={<DriveFileRenameOutlineIcon />} title={"Edit Staff"} />
					<DismissForm btn={"dismiss"} icon={<PersonRemoveIcon />} title={"Dismiss Staff"} />
				</Box>

				<DataGrid
					marginTop={"5rem"}
					rows={staffList}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
					checkboxSelection
				/>
			</Box>
		</Box>
	);
};

export default Staff;

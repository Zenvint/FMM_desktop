/** @format */
import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { studentList } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Form from "../../components/form";
import EditForm from "../../components/editForm";
import DismissForm from "../../components/dismissForm";

const Students = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [selectedRowIds, setSelectedRowIds] = React.useState([]);

	const handleSelectionModelChange = (ids) => {
		setSelectedRowIds(ids);
		console.log(selectedRowIds);
	};

	const columns = [
		{ field: "id", headerName: "ID", flex: 0.5 },
		{
			field: "studentName",
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
			field: "school",
			headerName: "SCHOOL",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "section",
			headerName: "SECTION",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "class",
			headerName: "CLASS",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "DoB",
			headerName: "DoB",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "PoB",
			headerName: "PoB",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "nationality",
			headerName: "NATIONALTY",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "parents",
			headerName: "PARENT",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "phone",
			headerName: "PHONE-No",
			flex: 1
		}
	];

	return (
		<Box m="10px">
			<Header title="STUDENTS" subtitle="List of all students." />
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
						color: `${colors.blueAccent[200]} `
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${colors.grey[100]}`
					}
				}}>
				<Box display={"flex"}>
					<Form btn={" Add Student"} />
					<EditForm btn={" Edit"} />
					<DismissForm btn={" Dismiss"} />
				</Box>
				<DataGrid
					rows={studentList}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
					checkboxSelection
					onRowSelectionModelChange={handleSelectionModelChange}
				/>
			</Box>
		</Box>
	);
};

export default Students;

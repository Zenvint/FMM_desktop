/** @format */
import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { studentList } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { AddBtn } from "../../components/Butthons";
import { Link } from "react-router-dom";


const Students = () => {
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
		<Box m="8px">
			<Header
				title="STUDENTS"
				subtitle="List of all students."
			/>
			<Box display={"flex"}>
				<Link to="/StudentForm">
					<AddBtn btnName="+ Add Student"/>
				</Link>
				<AddBtn btnName="Edit" />
				<AddBtn btnName="dismiss" />
				<AddBtn btnName="import" />
			</Box>
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
				<DataGrid
					marginTop={"5rem"}
					rows={studentList}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
					checkboxSelection
					sx={{
						backgroundColor: colors.primary[400],
						color: colors.grey[100]
					}}
				/>
			</Box>
		</Box>
	);
};

export default Students;

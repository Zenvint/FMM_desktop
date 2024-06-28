/** @format */

import React from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ModalList from "../../components/ModalList";

export const School = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const columns = [
		{
			field: "className",
			headerName: "CLASS",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "schoolName",
			headerName: "SCHOOL",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "sectionName",
			headerName: "SECTION",
			flex: 1,
			cellClassName: "name-column--cell"
		}
	];

	return (
		<Box m={"10px"}>
			<Header title="SCHOOL" />
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
				<Box display={"flex"} justifyContent={"space-between"} marginTop={"30px"} >
					<ModalList
						btnName={"add new"}
						icon={<AddCircleOutlinedIcon sx={{ height: "15px"}}/>}
					/>
					<Link
						to={"/settings"}
						style={{ color: colors.grey[100] }}>
						<ArrowBackOutlinedIcon />
					</Link>
				</Box>
				<DataGrid rows={""} columns={columns} checkboxSelection />
			</Box>
		</Box>
	);
};

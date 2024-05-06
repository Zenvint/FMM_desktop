import React from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import SessionForm from "../../components/createSession";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';


export const Session = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
		{ field: "id", headerName: "ID", flex: 0.5 },
		{
			field: "sessionName",
			headerName: "NAME",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "startDate",
			headerName: "START DATE",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "endDate",
			headerName: "END DATE",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "status",
			headerName: "STATUS",
			flex: 1,
			cellClassName: "name-column--cell"
		},
	];


    return (
        <div style={{margin: '10px'}}>
            <div class="box">
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "-10px" }}>
                <Header title="SESSIONS"  />
                <Link to={"/settings"} style={{ textDecoration: 'none', color: colors.grey[100] }}>
                    <ArrowBackOutlinedIcon className="li_icon" />
                </Link>
            </div>
            <Box
				m="0 0 0"
				height="70vh"
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
				<Box>
                    <SessionForm title={"Create New Academic Year"} icon={<AddCircleOutlinedIcon />} />
				</Box>
				<DataGrid
					rows={""}
					columns={columns}
					checkboxSelection
				/>
			</Box>
            </div>
        </div>
    )
}
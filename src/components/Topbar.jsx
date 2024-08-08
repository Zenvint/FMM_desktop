/** @format */

import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { colorModeContext, tokens } from "../hooks/theme.js";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SignalWifi0BarOutlinedIcon from "@mui/icons-material/SignalWifi0BarOutlined";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import { useSendLogoutMutation } from "../features/auth/authApiSlice.js";
import PulseLoader from 'react-spinners/PulseLoader';
import { useNavigate, Link } from "react-router-dom";


const Topbar = () => {
	const theme = useTheme();
	const colorMode = useContext(colorModeContext);
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();
	const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	

	const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation();


	const onLogoutClicked = async () => {
		handleClose();
		await sendLogout().unwrap();
		navigate("/");
	};

	const errClass = isError ? "errmsg" : "offscreen";

	let buttonContent;
	if (isLoading){
		buttonContent = <PulseLoader color={"#FFF"} />;
	} else {
		buttonContent = (
			<>
				<IconButton>
					<SignalWifi0BarOutlinedIcon />
				</IconButton>
				<IconButton
					onClick={handleClick}
					sx={{ ml: 2 }}
					aria-controls={open ? "settimgsMenu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}>
					<SettingsOutlinedIcon />
				</IconButton>
				<IconButton onClick={colorMode.toggleColorMode} sx={{ ml: 2 }}>
					{theme.palette.mode === "dark" ? (
						<DarkModeOutlinedIcon />
					) : (
						<LightModeOutlinedIcon />
					)}
				</IconButton>
			</>
		);
	}

	return (
		<Box display="flex" justifyContent=" space-between" p={1.5}>
			{/* STATUS BAR */}
			<Box
				display="flex"
				backgroundColor={colors.primary[400]}
				borderRadius="5px"
				height={"30px"}
				width={"125px"}
				justifyContent={"space-between"}
				alignItems={"center"}
				marginLeft={"10px"}>
				<h5 style={{ marginLeft: "10px" }} id="academic_year">
					{formattedDate}
				</h5>
				<p
					id="academic_status"
					style={{
						marginRight: "10px",
						fontWeight: "bold",
						color: "green"
					}}>
					Active
				</p>
			</Box>

			{/* ICONS */}
			<Box display="flex" pt={-5}>
				<p className={errClass}>{error?.data?.message}</p>
				{buttonContent}
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="settingsMenu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1
						},
						"&::before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0
						}
					}
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
				<MenuItem onClick={handleClose}>New academic year</MenuItem>
				<MenuItem onClick={handleClose}>+ Add school</MenuItem>
				<Link to="/dash/sections" ><MenuItem >Sections</MenuItem></Link>
				<MenuItem onClick={handleClose}>+ Add class</MenuItem>
				<Divider />
				<MenuItem onClick={onLogoutClicked}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</Box>
	);
};

export default Topbar;

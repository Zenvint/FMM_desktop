/** @format */

import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { colorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SignalWifi0BarOutlinedIcon from "@mui/icons-material/SignalWifi0BarOutlined";


const Topbar = () => {
	const theme = useTheme();
	const colorMode = useContext(colorModeContext);
	const colors = tokens(theme.palette.mode);

	return (
		<Box display="flex" justifyContent=" space-between" p={1.5}>
			{/* STATUS BAR */}
			<Box
				display="flex"
				backgroundColor={colors.primary[400]}
				borderRadius="5px"
				height={"30px"}
				width={"160px"}
				justifyContent={"space-between"}
				alignItems={"center"}
				marginLeft={"10px"}>
				<select
					style={{
						border: "none",
						backgroundColor: colors.primary[400],
						color: colors.grey[100],
						width: "100%",
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						outline: "none",
						gap: "25px",
					}}>
					<option value="2023/2024">
						<p style={{ marginLeft: "10px",  }}>2023/2024</p>
						<p style={{ marginLeft: "10px", color: colors.greenAccent[500] }}>Active</p>
					</option>
					<option value="offline">Offline</option>
				</select>
			</Box>

			{/* ICONS */}
			<Box display="flex" pt={-5}>
				<IconButton>
					<SignalWifi0BarOutlinedIcon />
				</IconButton>
				<IconButton onClick={colorMode.toggleColorMode} sx={{ ml: 2 }}>
					{theme.palette.mode === "dark" ? (
						<DarkModeOutlinedIcon />
					) : (
						<LightModeOutlinedIcon />
					)}
				</IconButton>
			</Box>
		</Box>
	);
};

export default Topbar;

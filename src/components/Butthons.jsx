/** @format */

import React from "react";
import { Button } from "@mui/material";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

export const CustomBtn = ({ btnName, }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Button
			sx={{
				color: colors.grey[100],
                border: "none",
				fontSize: "10px",
				padding: "0 0",
				":hover": { color: colors.greenAccent[500], backgroundColor: colors.primary[400] },
                fontWeight: "bold",
			}}>
			{btnName}
		</Button>
	);
};

/** @format */

import React from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import { Link } from "react-router-dom";

export const Settings = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box>
			<Box  p={2}>
                <Header title="SETTINGS" subtitle="System Settings" />
				<div class="box">
					<ul>
                        <Link to={"/settings/session"} style={{ textDecoration: 'none', color: colors.grey[100] }}>
                            <li>
                                <PendingActionsOutlinedIcon className="li_icon" /> Academic year
                            </li>
                        </Link>
                        <Link to={"/settings/school"} style={{ textDecoration: 'none', color: colors.grey[100] }}>
                            <li>
                                <CreditScoreOutlinedIcon className="li_icon" /> School settings
                            </li>
                        </Link>
					</ul>
				</div>
			</Box>
		</Box>
	);
};

/** @format */

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

export default function Warnimg({btn, icon, title, message}) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		borderRadius: "15px",
		width: 300,
		height: 200,
		bgcolor: { xs: colors.primary[400]},
		boxShadow: 24,
		p: 3
	};

	return (
		<div className="form">
			<Button className="btn" onClick={handleOpen} sx={{ color: colors.grey[100], fontSize: "12px"}}>
				{icon} {btn}
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{ backdrop: {timeout: 600} }}>
				<Fade in={open}>
					<Box sx={style}>
						<header className="header">
							{title}
						</header>
                        <div style={{marginTop: "25px", textAlign: "center", fontSize: "15px"}}>
                            <label>{message}</label>
                        </div>
                        <div style={{marginTop: "25px", textAlign: "center",}}>
                            <button onClick={handleClose} class="submit-button" style={{background: "none", marginRight: "10px"}}>
								Yes
							</button>
                            <button onClick={handleClose} class="submit-button" style={{background: "none", marginLeft: "10px"}}>
								No
							</button>
                        </div>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};




/** @format */

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import CloseIcon from "@mui/icons-material/Close";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function DismissForm({btn}) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
    const [name, setName] = React.useState("");
    const [id, setId] = React.useState("");
    const [message, setMessage] = React.useState("");

	const handleFormSubmit = () => {
		handleClose();
	};

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		borderRadius: "15px",
		width: 600,
		height: 475,
		bgcolor: { xs: colors.primary[400]},
		boxShadow: 24,
		p: 3
	};

	return (
		<div className="form">
			<Button className="btn" onClick={handleOpen} sx={{ mt: 0, ml: -23, color: colors.grey[100], fontSize: "12px",  padding: "10px 1px" }}>
				<PersonRemoveIcon /> {btn}
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
							Dismiss
							<div className="close" onClick={handleClose}>
								<CloseIcon />
							</div>
						</header>
						<form action="#" class="form-container" id="form">
							<div class="input-container">
								<label for="studentName">Full Name:</label>
								<input id="studentName" type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={(e) => setName(e.target.value)} required/>
							</div>

							<div class="input-container">
								<label for="parents">Matricul:</label>
								<input id="id" type="text" value={id} onChange={(e) => setId(e.target.value)} required/>
							</div>

								<div class="input-container">
									<label for="phone">Reason for dismissal:</label>
									<input id="dismissMessage" type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Reason for dismissal" required style={{border: "none", outline: "none", width: "100%", height: "25vh", resize: "none", padding: "10px", borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", fontSize: "14px", fontFamily: "Arial, sans-serif", color: "black"}}/>
								</div>

							<button onClick={handleFormSubmit} class="submit-button" form="form" style={{marginTop: "25px"}}>
								Save
							</button>
						</form>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

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
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export default function EditStaff({btn}) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [ staffName, setStaffName ] = React.useState("");
	const [ staffID, setStaffID ] = React.useState("");
	const [ staffEmail, setStaffEmail ] = React.useState("");
	const [ staffPhone, setStaffPhone ] = React.useState("");
	const [ staffRole, setStaffRole ] = React.useState("");
	const [ salary, setSalary] = React.useState("");
	const [ gender, setGender ] = React.useState("");
	

	const handleSubmit = () => {
		handleClose();
	};


	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		borderRadius: "15px",
		width: 600,
		height: 550,
		bgcolor: { xs: colors.primary[400]},
		boxShadow: 24,
		p: 3
	};

	return (
		<div className="form">
			<Button className="btn" onClick={handleOpen} sx={{ mt: 0, ml: -17, color: colors.grey[100], fontSize: "12px",  padding: "10px 1px" }}>
                <DriveFileRenameOutlineIcon/> {btn}
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
							Edit Staff
							<div className="close" onClick={handleClose}>
								<CloseIcon />
							</div>
						</header>
						<form action="#" class="form-container" id="form">
							<div class="input-container">
								<label for="staffName">Full Name:</label>
								<input id="staffName" type="text" value={staffName} onChange={(e) => setStaffName(e.target.value)} required/>
							</div>

                            <div class="input-container">
								<label>Gender:</label>
								<div class="radio-container">
                                    <div>
                                        <input type="radio" id="check-male" name="gender" style={{ height: "16px", width: "30px" }}/>
                                        <label for="check-male" style={{ fontWeight: "100" }}> Male </label>
                                    </div>
									<div>
										<input type="radio" id="check-female" name="gender" style={{ height: "16px", width: "30px" }}/>
										<label for="check-female" style={{ fontWeight: "100" }}> Female </label>
									</div>
								</div>
							</div>

							<div className="class_container" style={{gap:"2.5rem"}}>
								<div class="input-container">
									<label for="role">Role:</label>
									<input id="role" type="text" value={staffRole} onChange={(e) => setStaffRole(e.target.value)} required style={{width:"16rem"}}/>
								</div>

								<div class="input-container">
									<label for="salary">Salary:</label>
									<input id="salary" type="text" value={salary} onChange={(e) => setSalary(e.target.value)} required  style={{width:"16rem"}}/>
								</div>
							</div>

							<div class="input-container">
								<label for="staffEmail">Email:</label>
								<input id="staffEmail" type="text" value={staffEmail} onChange={(e) => setStaffEmail(e.target.value)} required/>

							</div>

							<div className="class_container">
								<div class="input-container">
									<label for="staffNum">Phone number:</label>
									<input id="staffNun" type="text" value={staffPhone} onChange={(e) => setStaffPhone(e.target.value)} required style={{width:"16rem"}}/>
								</div>
							</div>

							<button onClick={handleSubmit} class="submit-button" form="form" style={{marginTop:"3rem"}}>
								Save
							</button>
						</form>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
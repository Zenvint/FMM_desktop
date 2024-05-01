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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { classList } from "../data/mockData";
import { sectionList } from "../data/mockData";
import { schoolList } from "../data/mockData";


export default function Form({btn}) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
			<Button className="btn" onClick={handleOpen} sx={{ mt: 0, ml: 0, color: colors.grey[100], fontSize: "12px",  padding: "10px 3px" }}>
				<PersonAddIcon/> {btn}
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
							Student Registration Form
							<div className="close" onClick={handleClose}>
								<CloseIcon />
							</div>
						</header>
						<form action="#" class="form-container" id="form">
							<div class="input-container">
								<label for="studentName">Full Name:</label>
								<input id="studentName" type="text" placeholder="Enter the student name" required/>
							</div>

							<div className="class_container">
								<div class="input-container">
									<label for="school" className="dropdown"> School: </label>
									<select id="school" placeholder="Select the school" required>
										{schoolList.map((item) => (
											<option value={item.id}>{item.Name}</option>
										))}
									</select>
								</div>

								<div class="input-container">
									<label for="section" className="dropdown"> Section: </label>
									<select id="section" placeholder="Select the section" required>
										{sectionList.map((item) => (
											<option value={item.id}>{item.Name}</option>
										))}
									</select>
								</div>

								<div class="input-container">
									<label for="class" className="dropdown"> Class: </label>
									<select id="class" placeholder="Select the class" required>
										{classList.map((item) => (
											<option value={item.id}>{item.Name}</option>
										))}
									</select>
								</div>
							</div>

							<div className="class_container">
								<div class="input-container">
									<label for="DoB" className="dropdown"> Date of birth: </label>
									<input id="DoB" type="date" placeholder="Enter date of birth" required/>
								</div>

								<div class="input-container">
									<label for="PoB">Place of birth:</label>
									<input id="PoB" type="text" placeholder="Enter place of birth" required/>
								</div>

								<div class="input-container">
									<label for="nationality">Nationality:</label>
									<input id="nationality" type="text" placeholder="Enter nationality" required/>
								</div>
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

							<div class="input-container">
								<label for="parents">Parent Name:</label>
								<input id="parents" type="text" placeholder="Enter the parent name" required/>

							</div>

							<div className="class_container">
								<div class="input-container">
									<label for="phone">Parent phone number:</label>
									<input id="phone" type="text" placeholder="Enter phone number" required/>
								</div>

								<div class="input-container">
									<label for="image">Student image:</label>
									<input id="image" type="file" accept="image/*"/>
								</div>
							</div>

							<button onClick={handleSubmit} class="submit-button" form="form">
								Save
							</button>
						</form>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

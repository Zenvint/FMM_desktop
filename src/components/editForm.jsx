// /** @format */

// import * as React from "react";
// import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";
// import { useTheme } from "@mui/material";
// import { tokens } from "../theme";
// import CloseIcon from "@mui/icons-material/Close";
// import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

// export default function EditForm({btn}) {
// 	const theme = useTheme();
// 	const colors = tokens(theme.palette.mode);
// 	const [open, setOpen] = React.useState(false);
// 	// const handleOpen = () => setOpen(true);
// 	// const handleClose = () => setOpen(false);
//     // const [image, setImage] = React.useState(image);
//     // const [gender, setGender] = React.useState(gender);
//     // const [studentName, setStudentName] = React.useState(studentName);
//     // const [school, setSchool] = React.useState(school);
//     // const [section, setSection] = React.useState(section);
//     // const [DoB, setDoB] = React.useState(DoB);
//     // const [PoB, setPoB] = React.useState(PoB);
//     // const [nationality, setNationality] = React.useState(nationality);
//     // const [parents, setParents] = React.useState(parents);
//     // const [phone, setPhone] = React.useState(phone);
//     // const [sClass, setClass] = React.useState(sClass);

// 	const handleSubmit = () => {
// 		const requiredFields = [ 
//             "image","gender", "studentName","school", "section", "class", "DoB", "PoB", "nationality", "parents", "phone"
// 		];
// 		let isFormValid = true;

// 		requiredFields.forEach((field) => {
// 			const element = document.getElementById(field);
// 			if (!element.value) {
// 				isFormValid = false;
// 			} else {
// 				element.style.border = "none";
// 			}
// 		});

// 		if (!isFormValid) {
// 			alert("Please fill in all required fields.");
// 			return;
// 		}

// 		const studentData = {
// 			name: document.getElementById("studentName").value,
// 			school: document.getElementById("school").value,
// 			section: document.getElementById("section").value,
// 			class: document.getElementById("class").value,
// 			gender: document.querySelector('input[name="gender"]:checked').value,
// 			dob: document.getElementById("DoB").value,
// 			pob: document.getElementById("PoB").value,
// 			nationality: document.getElementById("nationality").value,
// 			parents: document.getElementById("parents").value,
// 			phone: document.getElementById("phone").value
// 		};

// 		handleClose();
// 		console.log("Student Data:", studentData);
// 	};


// 	const style = {
// 		position: "absolute",
// 		top: "50%",
// 		left: "50%",
// 		transform: "translate(-50%, -50%)",
// 		borderRadius: "15px",
// 		width: 600,
// 		height: 550,
// 		bgcolor: { xs: colors.primary[400]},
// 		boxShadow: 24,
// 		p: 3
// 	};

// 	return (
// 		<div className="form">
// 			<Button className="btn" onClick={handleOpen} style={{ color: colors.grey[100] }}>
// 				<DriveFileRenameOutlineIcon/> {btn}
// 			</Button>
// 			<Modal
// 				aria-labelledby="transition-modal-title"
// 				aria-describedby="transition-modal-description"
// 				open={open}
// 				closeAfterTransition
// 				slots={{ backdrop: Backdrop }}
// 				slotProps={{ backdrop: {timeout: 600} }}>
// 				<Fade in={open}>
// 					<Box sx={style}>
// 						<header className="header">
// 							Student Registration Form
// 							<div className="close" onClick={handleClose}>
// 								<CloseIcon />
// 							</div>
// 						</header>
// 						<form action="#" class="form-container" id="form">
// 							<div class="input-container">
// 								<label for="studentName">Full Name:</label>
// 								<input id="studentName" type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} required/>
// 							</div>

// 							<div className="class_container">
// 								<div class="input-container">
// 									<label for="school" className="dropdown"> School: </label>
// 									<select id="school" value={school} onChange={(e) => setSchool(e.target.value)} required>
// 										<option value="Nursery">Nursery</option>
// 										<option value="Primary">Primary</option>
// 										<option value="Secondary">Secondary</option>
// 									</select>
// 								</div>

// 								<div class="input-container">
// 									<label for="section" className="dropdown"> Section: </label>
// 									<select id="section" value={section} onChange={(e) => setSection(e.target.value)} required>
// 										<option value="Anglophone">Anglophone</option>
// 										<option value="Francophone">Francophone</option>
// 									</select>
// 								</div>

// 								<div class="input-container">
// 									<label for="class" className="dropdown"> Class: </label>
// 									<select id="class" value={sClass} onChange={(e) => setClass(e.target.value)} required>
// 										<option value="class 1">Class 1</option>
// 										<option value="class 2">Class 2</option>
// 										<option value="class 3">Class 3</option>
// 										<option value="class 4">Class 4</option>
// 										<option value="class 5">Class 5</option>
// 										<option value="class 6">Class 6</option>
// 									</select>
// 								</div>
// 							</div>

// 							<div className="class_container">
// 								<div class="input-container">
// 									<label for="DoB" className="dropdown"> Date of birth: </label>
// 									<input id="DoB" type="date" value={DoB} onChange={(e) => setDoB(e.target.value)} required/>
// 								</div>

// 								<div class="input-container">
// 									<label for="PoB">Place of birth:</label>
// 									<input id="PoB" type="text" value={PoB} onChange={(e) => setPoB(e.target.value)} required/>
// 								</div>

// 								<div class="input-container">
// 									<label for="nationality">Nationality:</label>
// 									<input id="nationality" type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} required/>
// 								</div>
// 							</div>

// 							<div class="input-container">
// 								<label>Gender:</label>
// 								<div class="radio-container">
//                                     <div>
//                                         <input type="radio" id="check-male" name="gender" style={{ height: "16px", width: "30px" }}/>
//                                         <label for="check-male" style={{ fontWeight: "100" }}> Male </label>
//                                     </div>
// 									<div>
// 										<input type="radio" id="check-female" name="gender" style={{ height: "16px", width: "30px" }}/>
// 										<label for="check-female" style={{ fontWeight: "100" }}> Female </label>
// 									</div>
// 								</div>
// 							</div>

// 							<div class="input-container">
// 								<label for="parents">Parent Name:</label>
// 								<input id="parents" type="text" value={parents} onChange={(e) => setParents(e.target.value)} required/>
// 							</div>

// 							<div className="class_container">
// 								<div class="input-container">
// 									<label for="phone">Parent phone number:</label>
// 									<input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
// 								</div>

// 								<div class="input-container">
// 									<label for="image">Student image:</label>
// 									<input id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} value={image}/>
// 								</div>
// 							</div>

// 							<button onClick={handleSubmit} class="submit-button" form="form">
// 								Save
// 							</button>
// 						</form>
// 					</Box>
// 				</Fade>
// 			</Modal>
// 		</div>
// 	);
// }

/** @format */
import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "../../components/Header.jsx";
import { Link } from "react-router-dom";

const NewStudentForm = () => {
	return (
		<Box m="20px" >
		<Header title="New Student" />
		<Formik>
		  <form action="#">
			<div className="input-container">
			  <label htmlFor="studentName">Full Name:</label>
			  <input
				id="studentName"
				type="text"
				placeholder="Enter the student name"
				required
			  />
			</div>
  
			<div className="class_container">
			  <div className="input-container">
				<label htmlFor="school" className="dropdown">
				  {" "}
				  School:{" "}
				</label>
				<select id="school" placeholder="Select the school" required>
				  <option value="Nursery">Nursery</option>
				  <option value="Primary">Primary</option>
				  <option value="Secondary">Secondary</option>
				</select>
			  </div>
  
			  <div className="input-container">
				<label htmlFor="section" className="dropdown">
				  {" "}
				  Section:{" "}
				</label>
				<select id="section" placeholder="Select the section" required>
				  <option value="Anglophone">Anglophone</option>
				  <option value="Francophone">Francophone</option>
				</select>
			  </div>
  
			  <div className="input-container">
				<label htmlFor="className" className="dropdown">
				  {" "}
				  Class:{" "}
				</label>
				<select id="className" placeholder="Select the className" required>
				  <option value="className 1">Class 1</option>
				  <option value="className 2">Class 2</option>
				  <option value="className 3">Class 3</option>
				  <option value="className 4">Class 4</option>
				  <option value="className 5">Class 5</option>
				  <option value="className 6">Class 6</option>
				</select>
			  </div>
			</div>
  
			<div className="class_container">
			  <div className="input-container">
				<label htmlFor="DoB" className="dropdown">
				  {" "}
				  Date of birth:{" "}
				</label>
				<input
				  id="DoB"
				  type="date"
				  placeholder="Enter date of birth"
				  required
				/>
			  </div>
  
			  <div className="input-container">
				<label htmlFor="PoB">Place of birth:</label>
				<input
				  id="PoB"
				  type="text"
				  placeholder="Enter place of birth"
				  required
				/>
			  </div>
  
			  <div className="input-container">
				<label htmlFor="nationality">Nationality:</label>
				<input
				  id="nationality"
				  type="text"
				  placeholder="Enter nationality"
				  required
				/>
			  </div>
			</div>
  
			<div className="input-container">
			  <label>Gender:</label>
			  <div className="radio-container">
				<div>
				  <input
					type="radio"
					id="check-male"
					name="gender"
					style={{ height: "16px", width: "30px" }}
				  />
				  <label htmlFor="check-male" style={{ fontWeight: "100" }}>
					{" "}
					Male{" "}
				  </label>
				</div>
				<div>
				  <input
					type="radio"
					id="check-female"
					name="gender"
					style={{ height: "16px", width: "30px" }}
				  />
				  <label htmlFor="check-female" style={{ fontWeight: "100" }}>
					{" "}
					Female{" "}
				  </label>
				</div>
			  </div>
			</div>
  
			<div className="input-container">
			  <label htmlFor="parents">Parent Name:</label>
			  <input
				id="parents"
				type="text"
				placeholder="Enter the parent name"
				required
			  />
			</div>
  
			<div className="class_container">
			  <div className="input-container">
				<label htmlFor="phone">Parent phone number:</label>
				<input
				  id="phone"
				  type="text"
				  placeholder="Enter phone number"
				  required
				/>
			  </div>
  
			  <div className="input-container">
				<label htmlFor="image">Student image:</label>
				<input id="image" type="file" accept="image/*" />
			  </div>
			</div>
			<Link to={"/dash/users"}>
			  <button className="submit-button" type="cancel" variant="contained">
				Cancel
			  </button>
			</Link>
			<button className="submit-button" form="form">
			  Save
			</button>
		  </form>
		</Formik>
	  </Box>
	);
};

export default NewStudentForm;

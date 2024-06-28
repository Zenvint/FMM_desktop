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
import { classList } from "../data/mockData";
import { sectionList } from "../data/mockData";
import { schoolList } from "../data/mockData";


export default function Form({btn, icon, title}) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [selectedSchool, setSelectedSchool] = React.useState("");
	const [selectedSection, setSelectedSection] = React.useState("");
  

	const handleSubmit = () => {
		handleClose();
	};

	const handleSchoolChange = (event) => {
		setSelectedSchool(event.target.value);
	  };
	
	  const handleSectionChange = (event) => {
		setSelectedSection(event.target.value);
	  };
	
	  const filteredClasses = classList.filter(
		(cls) =>
		  cls.School === selectedSchool && cls.Section === selectedSection
	  );	


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
      <Button
        className="btn"
        onClick={handleOpen}
        sx={{
          mr: -18,
          color: colors.grey[100],
          fontSize: "12px",
          padding: "10px 3px"
        }}
      >
        {icon} {btn}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 600 } }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <header className="header">
              {title}
              <div className="close" onClick={handleClose}>
                <CloseIcon />
              </div>
            </header>
            <form action="#" class="form-container" id="form">
              <div class="input-container">
                <label for="studentName">Full Name:</label>
                <input
                  id="studentName"
                  type="text"
                  placeholder="Enter the student name"
                  required
                />
              </div>

			  <div className="class_container">
			  <div className="input-container">
                <label htmlFor="school" className="Fdropdown">
                  {" "}
                  School:{" "}
                </label>
                <select
                  id="school"
                  onChange={handleSchoolChange}
                  placeholder="Select the school"
                  required
				  style={{width: '10rem'}}
                >
                  <option value="">Select School</option>
                  {schoolList.map((item) => (
                    <option key={item.id} value={item.Name}>
                      {item.Name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-container">
                <label htmlFor="section" className="Fdropdown">
                  {" "}
                  Section:{" "}
                </label>
                <select
                  id="section"
                  onChange={handleSectionChange}
                  placeholder="Select the section"
                  required
				  style={{width: '10.25rem'}}
                >
                  <option value="">Select Section</option>
                  {sectionList.map((item) => (
                    <option key={item.id} value={item.Name}>
                      {item.Name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-container">
                <label htmlFor="class" className="Fdropdown">
                  {" "}
                  Class:{" "}
                </label>
                <select id="class" placeholder="Select the class" required 	style={{width: '10.5rem'}} >
                  <option value="">Select Class</option>
                  {filteredClasses.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.Name}
                    </option>
                  ))}
                </select>
              </div>

			  </div>

              <div className="class_container">
                <div class="input-container">
                  <label for="DoB" className="dropdown">
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

                <div class="input-container">
                  <label for="PoB">Place of birth:</label>
                  <input
                    id="PoB"
                    type="text"
                    placeholder="Enter place of birth"
                    required
                  />
                </div>

                <div class="input-container">
                  <label for="nationality">Nationality:</label>
                  <input
                    id="nationality"
                    type="text"
                    placeholder="Enter nationality"
                    required
                  />
                </div>
              </div>

              <div class="input-container">
                <label>Gender:</label>
                <div class="radio-container">
                  <div>
                    <input
                      type="radio"
                      id="check-male"
                      name="gender"
                      style={{ height: "16px", width: "30px" }}
                    />
                    <label for="check-male" style={{ fontWeight: "100" }}>
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
                    <label for="check-female" style={{ fontWeight: "100" }}>
                      {" "}
                      Female{" "}
                    </label>
                  </div>
                </div>
              </div>

              <div class="input-container">
                <label for="parents">Parent Name:</label>
                <input
                  id="parents"
                  type="text"
                  placeholder="Enter the parent name"
                  required
                />
              </div>

              <div className="class_container">
                <div class="input-container">
                  <label for="phone">Parent phone number:</label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div style={{ display: "grid" }}>
                  <label for="image">Student image:</label>
                  <input id="image" type="file" accept="image/*" style={{}} />
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

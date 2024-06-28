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
import { classList, sectionList, schoolList } from "../data/mockData";

export default function FeeSettingForm({ btn, icon, title }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [selectedSchool, setSelectedSchool] = React.useState("");
  const [selectedSection, setSelectedSection] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleSubmit = () => {
    handleClose();
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
    width: 300,
    height: 550,
    bgcolor: { xs: colors.primary[400] },
    boxShadow: 24,
    p: 3,
  };

  return (
    <div className="form">
      <Button
        className="btn"
        onClick={handleOpen}
        sx={{
          color: colors.grey[100],
          fontWeight: "bold",
          ":hover": { color: colors.greenAccent[500] },
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
            <form action="#" className="form-container" id="form">
              <div style={{ display: "grid", gap: "10px" }}>
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
                  <select  id="class" placeholder="Select the class" required>
                    <option value="">Select Class</option>
                    {filteredClasses.map((item) => (
                      <option key={item.id} value={item.id} >
						{item.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gap: "10px" }}>
                <div className="input-container">
                  <label htmlFor="feeType" className="Fdropdown">
                    {" "}
                    Fee type:{" "}
                  </label>
                  <select
                    id="feeType"
					placeholder="Select the fee type"
                  required
                >
                  <option value="tuitionFee">Tuition Fee</option>
                  <option value="registrationFee">Registration Fee</option>
                  <option value="examFee">Examination Fee</option>
                </select>
              </div>

              <div className="input-container">
                <label htmlFor="amount" className="Fdropdown">
                  {" "}
                  Amount:{" "}
                </label>
                <input
                  id="amount"
                  type="text"
                  placeholder="Enter the amount for the fee"
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="installments">Installments:</label>
                <input type="number" min="1" max="5" step="1" />
              </div>
            </div>

            <button onClick={handleSubmit} className="submit-button" form="form">
              Save
            </button>
          </form>
        </Box>
      </Fade>
    </Modal>
  </div>
);
}
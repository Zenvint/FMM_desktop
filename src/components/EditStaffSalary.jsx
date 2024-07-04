/** @format */

import * as React from "react";
import { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import CloseIcon from "@mui/icons-material/Close";
import { staffList } from "../data/mockData";

export default function EditStaffSalary({ btn, icon, title }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedStaff, setSelectedStaff] = React.useState({
    staffName: "",
    role: "",
    salary: "",
    phone: ""
  });
  const [staffN, setStaffN] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);

  useEffect(() => {
    if (staffN.length > 0) {
      const newSuggestions = staffList.filter(staff =>
        staff.staffName.toLowerCase().includes(staffN.toLowerCase())
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
      setSelectedStaff({
        staffName: "",
        role: "",
        salary: "",
        phone: ""
      });
    }
  }, [staffN]);

  const handleStaffChange = (staff) => {
    setSelectedStaff(staff);
    setStaffN(staff.staffName);
    setSuggestions([]);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedStaff(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    handleClose();
    document.getElementById("form").reset();
  };

  const close = () => {
    handleClose();
    document.getElementById("form").reset();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "15px",
    width: 350,
    height: 425,
    bgcolor: { xs: colors.primary[400] },
    boxShadow: 24,
    p: 3
  };

  return (
    <div className="form">
      <Button
        className="btn"
        onClick={handleOpen}
        sx={{
          mt: 0,
          ml: 0,
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
              <div className="close" onClick={close}>
                <CloseIcon />
              </div>
            </header>
            <form action="#" className="form-container" id="form" onSubmit={handleSubmit}>
              <div className="input-container">
                <label>Staff Name:</label>
                <input
                  type="text"
                  id="staffN"
                  name="staffN"
                  value={staffN}
                  onChange={(e) => setStaffN(e.target.value)}
                  required
                  style={{
                    outlineColor: colors.primary[500],
                    fontWeight: "600",
                    position: "relative",
                  }}
                />
                <div className="dropdownContent1">
                  {suggestions.length > 0 && (
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleStaffChange(suggestion)}
                          className="dropDownLi"
                        >
                          {suggestion.staffName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div className="input-container">
                  <label>Role:</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={selectedStaff.role}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <label>Salary</label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={selectedStaff.salary}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={selectedStaff.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="submit-button">
                Save
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
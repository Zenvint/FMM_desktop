/** @format */

import * as React from "react";
import { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { RadioGroup, useTheme, FormControlLabel, Radio } from "@mui/material";
import { tokens } from "../theme";
import CloseIcon from "@mui/icons-material/Close";
import { studentList } from "../data/mockData";
import Receipt from "./Receipt";

export default function PayFeeForm({ btn, icon, title }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [receiptOpen, setReceiptOpen] = React.useState(false);
  const handleReceiptOpen = () => setReceiptOpen(true);
  const handleReceiptClose = () => setReceiptOpen(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [studentN, setStudentN] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [formData, setFormData] = React.useState({
    studentName: "",
    school: "",
    section: "",
    class: "",
    feeType: "",
    discount: "",
    amtPaid: "",
    balance: "",
    status: "",
    date: ""
  });

  useEffect(() => {
    if (studentN.length > 0) {
      const newSuggestions = studentList.filter(student =>
        student.studentName.toLowerCase().includes(studentN.toLowerCase())
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
      setSelectedStudent(null);
    }
  }, [studentN]);

  const handleStudentChange = (student) => {
    setSelectedStudent(student);
    setStudentN(student.studentName);
    setSuggestions([]);
    handleChange({ target: { name: "studentName", value: student.studentName } });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    handleReceiptOpen();
    onsubmit(formData);
    document.getElementById("form").reset();
  };

  const handleChange =  (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }


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
    width: 600,
    height: 500,
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
            <form action="#" class="form-container" id="form" onSubmit={handleSubmit}>
              <div class="input-container">
                <label>Student Name:</label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={studentN}
                  onChange={(e) => setStudentN(e.target.value)  }
                  required
                  style={{
                    outlineColor: colors.primary[500],
                    fontWeight: "600",
                    position: "relative",
                  }}
                />
                <div className="dropdownContent">
                  {suggestions.length > 0 && (
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleStudentChange(suggestion)}
                          className="dropDownLi"
                        >
                          {suggestion.studentName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "25px" }}
              >
                <div class="input-container">
                  <label>School:</label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    value={selectedStudent?.school || ""}
                    onChange={(e) => handleChange(e)}
                    readOnly
                  />
                </div>
                <div class="input-container">
                  <label>Section:</label>
                  <input
                    type="text"
                    id="section"
                    name="section"
                    value={selectedStudent?.section || ""}
                    onChange={(e) => handleChange(e)}
                    readOnly
                  />
                </div>
                <div class="input-container">
                  <label>Class:</label>
                  <input
                    type="text"
                    id="class"
                    name="class"
                    value={selectedStudent?.class || ""}
                    onChange={(e) => handleChange(e)}
                    readOnly
                  />
                </div>
              </div>

              <div class="input-container">
                <label>Fee Type:</label>
                <RadioGroup name="feeType" value={formData.feeType} onChange={handleChange}>
                  <div style={{marginLeft: "10px"}}>
                    <FormControlLabel value="registration Fee" control={<Radio />} label="Registration Fee" />
                    <FormControlLabel value="school Fee" control={<Radio />} label="School Fee" />
                    <FormControlLabel value="examination Fee" control={<Radio />} label="Examination Fee" />
                  </div>
                </RadioGroup>
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "15px" }}
              >
                <div class="input-container" style={{ width: "100%" }}>
                  <label>Discount:</label>
                  <input type="text" id="discount" name="discount" value={formData.discount} onChange={handleChange} required />
                </div>
                <div class="input-container" style={{ width: "100%" }}>
                  <label>Amount Paid:</label>
                  <input type="text" id="amtPaid" name="amtPaid" value={formData.amtPaid} onChange={handleChange} required />
                </div>
                <div class="input-container" style={{ width: "100%" }}>
                  <label>Balance:</label>
                  <input type="text" id="balance" name="balance" value={formData.balance} onChange={handleChange} required />
                </div>
                <div class="input-container" style={{ width: "100%" }}>
                  <label>Status:</label>
                  <select id="status" name="status" value={formData.status} onChange={handleChange} style={{ height: "33px", marginTop: "1px" }}>
                    <option value="Paid">Incomplete</option>
                    <option value="Pending">Complet</option>
                  </select>
                </div>
              </div>

              <div class="input-container">
                <label>Date:</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
              </div>

              <button onClick={handleSubmit} class="submit-button" form="form" >
                Save
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Receipt title={"Receipt"} open={receiptOpen} handleClose={handleReceiptClose} />
    </div>
  );
}
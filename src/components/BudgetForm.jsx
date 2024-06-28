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

export default function BudgetForm({ btn, icon, title }) {
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
    width: 300,
    height: 200,
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
          fontSize: "10px",
          padding: "10px 3px",
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
                <label for="amt">Annual Budget:</label>
                <input id="amt" type="text" required />
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

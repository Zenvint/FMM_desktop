/** @format */

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";

export default function Receipt({ open, handleClose, title }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const printReceipt = () => {
    const receiptContent = document.getElementById("receipt").innerHTML;
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.style.display = "none";
    iframe.contentDocument.write(`
      <html>
      <head><title>Receipt</title></head>
      <body>${receiptContent}</body>
      </html>
    `);
    iframe.contentDocument.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "15px",
    width: 600,
    height: 450,
    bgcolor: { xs: colors.primary[400] },
    boxShadow: 24,
    p: 3
  };


  return (
    <div className="form">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          onClick: (e) => e.stopPropagation()
        }}
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

            <body id="receipt" style={{width: "100%", height: "50vh", backgroundColor: "white", marginTop: "30px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div style={{width: "96%", height: "96%", border: "1px solid black", borderRadius: "10px" }}>
                    <div style={{width: "100%", height: "10vh", display: "flex", justifyContent: "center", alignItems: "center", gap: "65px", }} >
                        <img src={`${process.env.PUBLIC_URL}/school_logo.png`} alt="school_logo" style={{width: "60px", height: "50px"}} />
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "-50px", textAlign: "center"}}>
                          <p style={{fontSize: "10px", fontWeight: "bold", color: "black", width: "250px"}}>REPUBLIQUE DU CAMEROUN </p>
                          <p style={{fontSize: "10px", fontWeight: "bold", color: "black", width: "250px", marginTop: "-10px"}}>FONDATION BILINGUE MARGUERITE MARQUEZ </p>
                          <p style={{fontSize: "10px", fontWeight: "bold", color: "black", width: "250px", marginTop: "-10px"}}> Discipline-Hardwork-Success </p>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/camer.png`} alt="school_logo" style={{width: "60px", height: "50px",}} />
                    </div>

                    <div style={{width: "100%", height: "5vh", borderBlockStart:"1px solid black", borderBlockEnd:"1px solid black", display: "flex", justifyContent: "center", alignItems: "center", }} >
                      <p style={{fontSize: "10px", fontWeight: "900", color: "black", marginLeft: "5px"}} >FEE RECEIPT</p>
                    </div>

                    <div style={{width: "100%", height: "25vh", borderBlockEnd:"1px solid black", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "100px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
                        <div style={{ display: "flex", flexDirection: "row", gap: "5px"}}>
                          <label style={{fontSize: "11px", fontWeight: "500", color: "black"}}>Student Name:</label>
                          <p style={{fontSize: "12px", fontWeight: "600", color: "black",margin: "0.5px"}}>John Doe</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", gap: "5px"}}>
                          <label style={{fontSize: "11px", fontWeight: "500", color: "black"}}>School:</label>
                          <p style={{fontSize: "12px", fontWeight: "600", color: "black",margin: "0.5px"}}>Primary</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", gap: "5px"}}>
                          <label style={{fontSize: "11px", fontWeight: "500", color: "black"}}>Section:</label>
                          <p style={{fontSize: "12px", fontWeight: "600", color: "black",margin: "0.5px"}}>Francophone</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", gap: "5px"}}>
                          <label style={{fontSize: "11px", fontWeight: "500", color: "black"}}>Class:</label>
                          <p style={{fontSize: "12px", fontWeight: "600", color: "black",margin: "0.5px"}}>CM1</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", gap: "5px"}}>
                          <label style={{fontSize: "11px", fontWeight: "500", color: "black"}}>Fee Type:</label>
                          <p style={{fontSize: "12px", fontWeight: "600", color: "black",margin: "0.5px"}}>Resgistration Fee</p>
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
                        <div style={{ marginLeft: "10px", display: "flex", flexDirection: "row", gap: "5px"}}>
                          <label style={{fontSize: "11px", fontWeight: "500", color: "black"}}>Discount:</label>
                          <p style={{fontSize: "12px", fontWeight: "600", color: "black",margin: "0.5px"}}>0,000</p>
                        </div>
                        <div style={{ marginLeft: "10px", display: "flex", flexDirection: "row", gap: "5px"}}>
                          <label style={{fontSize: "11px", fontWeight: "500", color: "black"}}>Amount Paid:</label>
                          <p style={{fontSize: "12px", fontWeight: "600", color: "black",margin: "0.5px"}}>15,000</p>
                        </div>
                        <div style={{ marginLeft: "10px", display: "flex", flexDirection: "row", gap: "5px"}}>
                          <label style={{fontSize: "11px", fontWeight: "500", color: "black"}}>Balance:</label>
                          <p style={{fontSize: "12px", fontWeight: "600", color: "black",margin: "0.5px"}}>0,000</p>
                        </div>
                        <div style={{ marginLeft: "10px", display: "flex", flexDirection: "row", gap: "5px"}}>
                          <label style={{fontSize: "11px", fontWeight: "500", color: "black"}}>status:</label>
                          <p style={{fontSize: "12px", fontWeight: "600", color: "black",margin: "0.5px"}}>Completed</p>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", flexDirection: "column", textAlign: "center", gap: "-10px", marginTop: "5px", marginLeft: "75px"}}>
                        <label style={{fontSize: "11px", fontWeight: "500", color: "black"}}>Date</label>
                        <p style={{fontSize: "11px", fontWeight: "600", color: "black",margin: "0.5px"}}>2022-01-01</p>
                      </div>
                      <p style={{fontSize: "11px", fontWeight: "600", color: "black",marginTop: "0.5px", marginRight: "75px"}}>Signature</p>
                    </div>
                </div>
            </body>

            <Button onClick={printReceipt} sx={{ color: colors.grey[100], fontSize: "12px", gap: "5px", marginTop: "15px", ":hover": { color: colors.greenAccent[400] }}}> <PrintIcon/> Print</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
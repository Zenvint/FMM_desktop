/** @format */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../hooks/theme";
import PrintIcon from "@mui/icons-material/Print";
import Header from "../../components/Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import school_logo from "../../assets/images/school_logo.png";
import camer_logo from "../../assets/images/camer.png";
import { useGetFeesQuery } from "./feesApiSlice.js";
import { AddBtn } from "../../components/Button.jsx";

const RegistReceipt = () => {
    const { id , deposit} = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const { fee } = useGetFeesQuery("feesList", {
      selectFromResult: ({ data }) => ({
        fee: data?.entities[id],
      }),
    });
  
    const [currentDate, setCurrentDate] = useState('');
  
    useEffect(() => {
      const date = new Date();
      const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      setCurrentDate(formattedDate);
    }, []);
  
    const handleDone = () => {
      navigate("/dash/finance/fees");
    };
  
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
      p: 3,
    };
  
    return (
      <Box sx={style}>
        <Header title={"Receipt"} subtitle={"Fee receipt"} />
        <body
          id="receipt"
          style={{
            width: "100%",
            height: "50vh",
            backgroundColor: "white",
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "96%",
              height: "96%",
              border: "1px solid black",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "10vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "65px",
              }}
            >
              <img
                src={school_logo}
                alt="school_logo"
                style={{ width: "60px", height: "50px" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "-50px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    color: "black",
                    width: "250px",
                  }}
                >
                  REPUBLIQUE DU CAMEROUN{" "}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    color: "black",
                    width: "250px",
                    marginTop: "-10px",
                  }}
                >
                  FONDATION BILINGUE MARGUERITE MARQUEZ{" "}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    color: "black",
                    width: "250px",
                    marginTop: "-10px",
                  }}
                >
                  {" "}
                  Discipline-Hardwork-Success{" "}
                </p>
              </div>
              <img
                src={camer_logo}
                alt="school_logo"
                style={{ width: "60px", height: "50px" }}
              />
            </div>
  
            <div
              style={{
                width: "100%",
                height: "5vh",
                borderBlockStart: "1px solid black",
                borderBlockEnd: "1px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: "900",
                  color: "black",
                  marginLeft: "5px",
                }}
              >
                REGISTRATION FEE RECEIPT
              </p>
            </div>
  
            <div
              style={{
                width: "100%",
                height: "25vh",
                borderBlockEnd: "1px solid black",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "100px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    Student Name:
                  </label>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "black",
                      margin: "0.5px",
                    }}
                  >
                    {fee.studentname}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    Matricule:
                  </label>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "black",
                      margin: "0.5px",
                    }}
                  >
                    {fee.matricule}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    Section:
                  </label>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "black",
                      margin: "0.5px",
                    }}
                  >
                    {fee.sectionname}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    Class:
                  </label>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "black",
                      margin: "0.5px",
                    }}
                  >
                    {fee.classname}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    Fee Type:
                  </label>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "black",
                      margin: "0.5px",
                    }}
                  >
                    Registration Fee
                  </p>
                </div>
              </div>
  
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    marginLeft: "10px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    Deposit:
                  </label>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "black",
                      margin: "0.5px",
                    }}
                  >
                   {deposit} FCFA
                  </p>
                </div>
                <div
                  style={{
                    marginLeft: "10px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    status:
                  </label>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "black",
                      margin: "0.5px",
                    }}
                  >
                    {fee.registrationfee ? "Paid" : "Not Paid"}
                  </p>
                </div>
              </div>
            </div>
  
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  gap: "-10px",
                  marginTop: "5px",
                  marginLeft: "75px",
                }}
              >
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  Date
                </label>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "black",
                    margin: "0.5px",
                  }}
                >
                  {currentDate}
                </p>
              </div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "black",
                  marginTop: "0.5px",
                  marginRight: "75px",
                }}
              >
                Signature
              </p>
            </div>
          </div>
        </body>
  
        <Box display={"flex"} justifyContent={"center"} >
          <Button
            onClick={printReceipt}
            sx={{
              color: colors.grey[100],
              fontSize: "12px",
              gap: "5px",
              marginTop: "15px",
              ":hover": { color: colors.greenAccent[400] },
            }}
          >
            {" "}
            <PrintIcon /> Print
          </Button>
          <AddBtn btnName={"Done"} handleEdit={handleDone} />
        </Box>
      </Box>
    );
}

export default RegistReceipt
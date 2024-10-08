/** @format */

import React from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../hooks/theme.js";
import { Box } from "@mui/material";
import Header from "../../components/Header.jsx";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

const Settings = () => {
  const {isAdmin} = useAuth()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Box p={2}>
        <Header title="SETTINGS" subtitle="System Settings" />
        <div className="box">
          <ul>
            
              {/* <Link
                to={""}
                style={{ textDecoration: "none", color: colors.grey[100] }}
              >
                <li>
                  <PendingActionsOutlinedIcon className="li_icon" /> Academic
                  year
                </li>
              </Link> */}
              <Link
                to={"/dash/settings/sections"}
                style={{ textDecoration: "none", color: colors.grey[100] }}
              >
                <li>
                  <CreditScoreOutlinedIcon className="li_icon" /> Section
                  settings
                </li>
              </Link>
              <Link
                to={"/dash/settings/classes"}
                style={{ textDecoration: "none", color: colors.grey[100] }}
              >
                <li>
                  <CreditScoreOutlinedIcon className="li_icon" /> Classes
                  settings
                </li>
              </Link>
            
           
              <Link
                to={"/dash/settings/installments"}
                style={{ textDecoration: "none", color: colors.grey[100] }}
              >
                <li>
                  <CreditScoreOutlinedIcon className="li_icon" /> Fee
                  Installments Settings
                </li>
              </Link>
              {isAdmin && <Link
                to={"/dash/settings/fees"}
                style={{ textDecoration: "none", color: colors.grey[100] }}
              >
                <li>
                  <CreditScoreOutlinedIcon className="li_icon" /> General settings
                </li>
              </Link>}
           
          </ul>
        </div>
      </Box>
    </Box>
  );
};

export default Settings;

import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { colorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SignalWifi0BarOutlinedIcon from '@mui/icons-material/SignalWifi0BarOutlined';
import { ArrowDropDown } from "@mui/icons-material";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import InputBase from "@mui/material/InputBase";


const Topbar = () => {
 const theme = useTheme();
 const colorMode = useContext(colorModeContext);
 const colors = tokens(theme.palette.mode);

 return (
    <Box display="flex" justifyContent="space-between" p={1.5}    >
        {/* STATUS BAR */}
        <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="5px"
            height={"30px"}
            width={"175px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            marginLeft={"10px"}
        >
            <h5 style={{ marginLeft: "10px",}}>2023/2024</h5>
            <p style={{ marginRight: "10px",fontWeight:"bold", color:colors.greenAccent[700]}}>Active</p>

            <IconButton type="button" sx={{ p: 1 }}>
                <ArrowDropDown />
            </IconButton>
        </Box>

        {/* <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="10px"
            height={"30px"}
            width={{ xs: "50%", sm: "30%" }}
        >
            <InputBase sx={{ ml: 3, flex: 1 }} placeholder="Search"  />
            <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
            </IconButton>
        </Box> */}

        {/* ICONS */}
        <Box display="flex" pt={-5} >
            <IconButton>
                <SignalWifi0BarOutlinedIcon />
            </IconButton>
            <IconButton>
                <SettingsOutlinedIcon />
            </IconButton>
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon />
                ) : (
                    <LightModeOutlinedIcon />
                )}
            </IconButton>
        </Box>
    </Box>
 );
};

export default Topbar;
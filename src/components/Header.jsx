import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../hooks/theme.js";


const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box mb="10px">
            <Typography
                variant="h5"
                color={colors.grey[100]}
                fontWeight="bold"
                textTransform={"uppercase"}
                sx={{ mb: "3px" }}
            >
                {title}
            </Typography>
            <Typography variant="h6" color={colors.greenAccent[400]}>
                {subtitle}
            </Typography>
        </Box>
    );
};


export default Header;
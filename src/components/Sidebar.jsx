/** @format */

import "react-pro-sidebar/dist/css/styles.css";
import React from "react";
import { useState } from "react";
import { Menu, MenuItem, ProSidebar, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../hooks/theme.js";
import { HomeRounded, LogoutOutlined,MonetizationOnRounded, PaymentOutlined, SchoolRounded, Settings } from "@mui/icons-material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
// import Warnimg from "../../components/warning";


// Item component to display each menu item in the sidebar
const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100]
			}}
			onClick={() => setSelected(title)}
			icon={icon}>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	);
};

// Sidebar component
const Sidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState("Dashboard");

	return (
		<Box
			width={isCollapsed ? "80px" : "300px"}
			backgroundColor={colors.primary[400]}
			sx={{
				"& .pro-sidebar-inner": {
					background: `${colors.primary[400]} !important`
				},
				"& .pro-icon-wrapper": {
					backgroundColor: "transparent !important"
				},
				"& .pro-inner-item": {
					padding: "5px 35px 5px 20px !important"
				},
				"& .pro-inner-item:hover": {
					color: "#868dfb !important"
				},
				"& .pro-menu-item.active": {
					color: "#6870fa !important"
				}
			}}>
			<ProSidebar collapsed={isCollapsed}>
				<Menu iconShape="square">
					{/* Sidebar header */}
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							margin: "3px 0 5px 0",
							color: colors.grey[100]
						}}>
						{!isCollapsed && (
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								ml="15px">
								<Typography variant="h6" color={colors.grey[300]}>
									Systen Admin
								</Typography>
								<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{!isCollapsed && (
						<Box mb="25px">
							<Box
								display={"flex"}
								p="1 0"
								justifyContent="center"
								alignItems={"center"}>
								<img
									alt="profile-user"
									width="50px"
									height="45px"
									style={{ cursor: "pointer", borderRadius: "50%" }}
									src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
								/>
							</Box>
							<Box>
								<Typography
									display={"block"}
									variant="body2"
									sx={{ color: colors.grey[100] }}
									align={"center"}
									p={1}
									fontWeight={"bold"}>
									{" "}
									Kevin B
								</Typography>
							</Box>
						</Box>
					)}

					<Box>
						<Item
							title={"Dashboard"}
							to="/dash"
							icon={<HomeRounded />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title={"Students"}
							to="/dash/students"
							icon={<WcOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
							onClick={()=> setSelected('Students')}
						/>
						<Item
							title={"Staff"}
							to=""
							icon={<GroupsIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title={"Academics"}
							to=""
							icon={<SchoolRounded />}
							selected={selected}
							setSelected={setSelected}
						/>
						<SubMenu
							title={"Finance"}
							style={{
								color: colors.grey[100],
								fontWeight: "500",
								backgroundColor: colors.primary[400]
							}}
							to=""
							icon={<MonetizationOnRounded />}
							selected={selected}
							>
							<Item
								title={"Tuitions Fee"}
								className="subMenu"
								to=""
								icon={<PaymentsOutlinedIcon />}
								selected={selected}
								setSelected={setSelected}
							/>
							<Item
								title={"Salaries"}
								className="subMenu"
								to=""
								icon={<PaymentOutlined />}
								selected={selected}
								setSelected={setSelected}
							/>
							<Item
								title={"Expense"}
								className="subMenu"
								to=""
								icon={<AddShoppingCartOutlinedIcon />}
								selected={selected}
								setSelected={setSelected}
							/>
						</SubMenu>
						<Item
							title={"Users"}
							to="/dash/users"
							icon={<PersonIcon />}
							selected={selected}
							setSelected={setSelected}
							onClick={()=> setSelected('Users')}
						/>
						<Item
							title={"Settings"}
							to="/dash/settings"
							icon={<Settings />}
							selected={selected}
							setSelected={setSelected}
							onClick={()=> setSelected('Settings')}
						/>
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default Sidebar;

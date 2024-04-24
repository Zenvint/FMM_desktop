/** @format */

import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const StaffForm = () => {
	return (
		<Box m="20px">
			<Header title="New Staff" />
			<Formik>
				<form>
					<Box
						display="grid"
						gridTemplateColumns="repeat, minmax(0, 1fr))"
						gap="15px">
						<TextField
							variant="filled"
							type="text"
							label="Name"
							name="Name"
							sx={{ gridColumn: "span 8" }}
						/>
						<TextField
							select
							variant="filled"
							type="text"
							label="Gender"
							name="gender"
							sx={{ gridColumn: "span 4" }}
						/>
						<TextField
                        select
							variant="filled"
							type="text"
							label="Role"
							name="role"
							sx={{ gridColumn: "span 4" }}
						/>
                        {/*NOTE:
                            the role should be a drop-down list with checkboxes, stuff can 
                            have more than one role and if role is equals to teacher then 
                            salary is equal to amount per hour times total number of hours 
                        */}
						<TextField
							variant="filled"
							type="text"
							label="Salary"
							name="salary"
							sx={{ gridColumn: "span 4" }}
						/>
						<TextField
							variant="filled"
							type="text"
							label="Email"
							name="email"
							sx={{ gridColumn: "span 4" }}
						/>
						<TextField
							variant="filled"
							type="text"
							label="Phone Number"
							name="phone"
							sx={{ gridColumn: "span 4" }}
						/>
					</Box>
					<Box
						display="flex"
						justifyContent="end"
						mt="20px"
						fontWeight={"bold"}>
						<Link to={"/Staff"}>
							<Button type="cancel" variant="contained">
								Cancel
							</Button>
						</Link>
						<Button type="submit" color="secondary" variant="contained">
							Save
						</Button>
					</Box>
				</form>
			</Formik>
		</Box>
	);
};

export default StaffForm;

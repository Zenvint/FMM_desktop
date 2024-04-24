/** @format */

import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const StudentForm = () => {
	return (
		<Box m="20px">
			<Header title="New Student" />
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
							sx={{ gridColumn: "span 9" }}
						/>
						<TextField
              select
							variant="filled"
							type="Class"
							label="class"
							name="class"
							sx={{ gridColumn: "span 4" }}
						/>
						<TextField
              select
							variant="filled"
							type="text"
							label="Section"
							name="section"
							sx={{ gridColumn: "span 4" }}
						/>
						<TextField
              select
							variant="filled"
							type="text"
							label="School"
							name="school"
							sx={{ gridColumn: "span 4" }}
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
							variant="filled"
							type="date"
							label="Date of Birth"
							name="DoB"
							sx={{ gridColumn: "span 3" }}
						/>
						<TextField
							variant="filled"
							type="text"
							label="place of birth"
							name="PoB"
							sx={{ gridColumn: "span 3" }}
						/>
						<TextField
							variant="filled"
							type="text"
							label="Parent Name"
							name="parent"
							sx={{ gridColumn: "span 3" }}
						/>
						<TextField
							variant="filled"
							type="text"
							label="Parent Phone Number"
							name="phone"
							sx={{ gridColumn: "span 3" }}
						/>
						<TextField
							variant="filled"
							type="text"
							label="Photo"
							name="image"
							sx={{ gridColumn: "span 3" }}
						/>
					</Box>
					<Box
						display="flex"
						justifyContent="end"
						mt="20px"
						fontWeight={"bold"}>
						<Link to={"/Students"}>
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

export default StudentForm;

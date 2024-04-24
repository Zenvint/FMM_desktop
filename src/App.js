import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Dashboard  from "./scenes/dashboard";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./scenes/global/sidebar";
import Students from "./scenes/Students";
import StudentForm from "./scenes/StudentForm";
import Staff from "./scenes/Staff";
import StaffForm from "./scenes/StaffForm";

function App() {
	const [theme, colorMode] = useMode();

	return (
		<colorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<Sidebar />
					<main className="content">
						<Topbar />
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/students" element={<Students />} />
							<Route path="/studentform" element={<StudentForm />} />
							<Route path="/staff" element={<Staff />} />
							<Route path="/staffform" element={<StaffForm />} />
						</Routes>
					</main>
				</div>
			</ThemeProvider>
		</colorModeContext.Provider>
	);
}

export default App;

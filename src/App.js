import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Dashboard  from "./scenes/dashboard";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./scenes/global/sidebar";
import Students from "./scenes/Students";
import Staff from "./scenes/Staff";
import { Session } from "./scenes/Settings/session";
import { Settings } from "./scenes/Settings";
import { School } from "./scenes/Settings/school";
import { FeeSettings } from "./scenes/Settings/feeSettings";
import { TuitionFee } from "./scenes/Finance/TuitionFee";
import { Salaries } from "./scenes/Finance/Salaries";
import { Expenses } from "./scenes/Finance/Expenses";

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
							<Route path="/staff" element={<Staff />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/settings/session" element={<Session />} />
							<Route path="/settings/school" element={<School />} />
							<Route path="/settings/feeSettings" element={<FeeSettings />} />
							<Route path="/finance/tuitionFee" element={<TuitionFee />} />
							<Route path="/finance/salaries" element={<Salaries />} />
							<Route path="/finance/expenses" element={<Expenses />} />
						</Routes>
					</main>
				</div>
			</ThemeProvider>
		</colorModeContext.Provider>
	);
}

export default App;

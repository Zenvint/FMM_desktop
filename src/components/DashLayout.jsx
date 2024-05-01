import React from 'react'
import {Outlet} from 'react-router-dom'
import {colorModeContext, useMode} from '../hooks/theme.js'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'


const DashLayout = () => {
    const [theme, colorMode] = useMode();
  return (
    <>
        <colorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<main className="app">
					<Sidebar />
					<div className="content">
						<Topbar />
						<Outlet />
					</div>
				</main>
			</ThemeProvider>
		</colorModeContext.Provider>
    </>
  )
}

export default DashLayout
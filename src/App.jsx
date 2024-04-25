import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Login from './features/auth/Login.jsx'
import PersistLogin from './features/auth/PersistLogin.jsx'
import Prefetch from './features/auth/Prefetch.jsx'
import Header from './components/Header.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch/>}>
            <Route path='dash'  element={<Header />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
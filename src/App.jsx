import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Login from './features/auth/Login.jsx'
import PersistLogin from './features/auth/PersistLogin.jsx'
import Prefetch from './features/auth/Prefetch.jsx'
import DashLayout from './components/DashLayout.jsx'
import Dashboard from './features/dashboard/Dashboard.jsx'
import Students from './features/students/Students.jsx'
import Users from './features/users/Users.jsx'
import NewUserForm from './features/users/NewUserForm.jsx'
import NewStudentForm from './features/students/NewStudentForm.jsx'
import EditUserForm from './features/users/EditUserForm.jsx'
import Sections from './features/sections/Sections.jsx'
import NewSectionForm from './features/sections/NewSectionForm.jsx'
import EditSectionForm from './features/sections/EditSectionForm.jsx'
import Settings from './features/settings/Settings.jsx'
import Classes from './features/classes/Classes.jsx'
import NewClassForm from './features/classes/NewClassForm.jsx'
import EditClassForm from './features/classes/EditClassForm.jsx'
import AddMultiStudentsForm from './features/students/AddMultiStudentsForm.js'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch/>}>
            <Route path='dash' element={<DashLayout/>}>
              <Route index element={<Dashboard />} />

              <Route path='users' >
                 <Route index element={<Users />} />
                 <Route path='new' element={<NewUserForm />}  />
                 <Route path=':id' element={<EditUserForm />}  />
              </Route>
              
              <Route path='settings' >
                 <Route index element={<Settings />} />
                 <Route path='sections' >
                    <Route index element={<Sections />} />
                    <Route path='new' element={<NewSectionForm />}  />
                    <Route path=':id' element={<EditSectionForm />}  />
                 </Route>
                 <Route path='classes' >
                    <Route index element={<Classes />} />
                    <Route path='new' element={<NewClassForm />}  />
                    <Route path=':id' element={<EditClassForm />}  />
                 </Route>
              </Route>

              <Route path='students' >
                 <Route index element={<Students />} />
                 <Route path='new' element={<NewStudentForm />}  />
                 <Route path='newmulti' element={<AddMultiStudentsForm />}  />
              </Route>
              <Route path='staff' >
                 <Route />
              </Route>
              <Route path='academics' >
                 <Route />
              </Route>
              <Route path='Finance' >
                 <Route />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
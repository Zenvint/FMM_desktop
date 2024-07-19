import React from 'react';
import { store } from '../../app/store.js';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { usersApiSlice } from '../users/usersApiSlice.js';
import { sectionsApiSlice } from '../sections/sectionsApiSlice.js';
import { classesApiSlice } from '../classes/classesApiSlice.js';
import { studentsApiSlice } from '../students/studentsApiSlice.js';
import { installmentsApiSlice } from '../installments/installmentsApiSlice.js';

const Prefetch = () => {
    
    useEffect(() => {
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(sectionsApiSlice.util.prefetch('getSections', 'sectionsList', { force: true }))
        store.dispatch(classesApiSlice.util.prefetch('getClasses', 'classesList', { force: true }))
        store.dispatch(studentsApiSlice.util.prefetch('getStudents', 'studentsList', { force: true }))
        store.dispatch(installmentsApiSlice.util.prefetch('getInstallments', 'installmentsList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch
import React from 'react';
import { store } from '../../app/store.js';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { usersApiSlice } from '../users/usersApiSlice.js';
import { sectionsApiSlice } from '../sections/sectionsApiSlice.js';

const Prefetch = () => {
    
    useEffect(() => {
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(sectionsApiSlice.util.prefetch('getSections', 'sectionsList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch
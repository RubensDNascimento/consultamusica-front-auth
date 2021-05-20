import React from 'react'

import{ Route, Redirect } from 'react-router'

const PrivateRoute = props =>{
    const isLogged = !!localStorage.getItem('app-token')
    const isAdmin = localStorage.getItem('user-role') === 'admin';
    return isLogged && isAdmin ? <Route { ...props } /> : <Redirect to= "/"/>}

export default PrivateRoute
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { checkLoggedIn } from '../utils/auth'

export const ProtectedRoutes = () => {
    const isLoggedIn = checkLoggedIn()
    if (isLoggedIn) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}

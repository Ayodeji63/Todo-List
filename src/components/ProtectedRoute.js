import React from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../Context/AuthContext'
const ProtectedRoute = ({children}) => {
    const {user} = useAuth();
    
    if (!user) {
        return <Navigate to={'/sign'} />
    }
    return children
}

export default ProtectedRoute
import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    if(!isAuthenticated){
        return <Navigate to='/login' />
    }
    return children;
}

export default ProtectedRoute

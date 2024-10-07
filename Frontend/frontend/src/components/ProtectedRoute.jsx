import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Updated import
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { authToken } = useContext(AuthContext);

    // If the user is not authenticated, redirect to the login page
    return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

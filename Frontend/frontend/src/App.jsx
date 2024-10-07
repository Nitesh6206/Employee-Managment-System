import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CreateEmployee from './components/Employee/CreateEmployee';
import EmployeeList from './components/Employee/EmployeeList';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './components/Home';
import EditEmployee from './components/Employee/EditEmployee';

function AppContent() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            {/* Conditionally render the Navbar if the user is authenticated */}
            {isAuthenticated && <Navbar />}

            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                    <Route path="/create-employee" element={<CreateEmployee />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/edit-employee/:id" element={<EditEmployee />} /> 
                </Route>

                {/* Redirect to login for any unknown route */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;

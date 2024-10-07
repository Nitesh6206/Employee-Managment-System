import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username'); // Use the key as a string
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to the login page after logging out
  };

  return (
    <AppBar 
      position="static" 
      sx={{
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        padding: '0.2rem 0',
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: '0.1rem' }}
        >
          Employee Management
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/home"
            startIcon={<HomeIcon />}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/employees"
            startIcon={<ListIcon />}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Employee List
          </Button>
         
          
          {username && (
            <Typography 
              variant="body1" 
              sx={{ color: '#fff', fontStyle: 'italic', fontWeight: 'bold' }}
            >
              Welcome, {username}
            </Typography>
          )}

          <Button 
            color="inherit" 
            onClick={handleLogout} 
            startIcon={<LogoutIcon />}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

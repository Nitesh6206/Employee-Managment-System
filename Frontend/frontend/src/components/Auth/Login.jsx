import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { login as loginService } from '../../services/authService';
import { Box, Button, Container, TextField, Typography, Paper, Link } from '@mui/material';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await loginService(username, password);
            login(data.token, data.username);
            console.log(data.token);
            navigate('/employees');
        } catch (error) {
            alert('Invalid login credentials');
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5rem',
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    padding: '2rem',
                    borderRadius: '15px',
                    backgroundColor: '#ffffff',
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Enhanced shadow for modern look
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    sx={{ fontWeight: 'bold', marginBottom: '1.5rem', color: '#1976d2' }}
                >
                    Welcome Back
                </Typography>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                    }}
                >
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{
                            backgroundColor: '#f9f9f9',
                            borderRadius: '5px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#1976d2',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#115293',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#115293',
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            backgroundColor: '#f9f9f9',
                            borderRadius: '5px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#1976d2',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#115293',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#115293',
                                },
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        fullWidth
                        sx={{
                            padding: '0.75rem',
                            borderRadius: '25px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            backgroundColor: '#1976d2',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                                backgroundColor: '#115293',
                            },
                        }}
                    >
                        Login
                    </Button>
                </Box>
                <Typography
                    align="center"
                    sx={{ marginTop: '1rem', color: '#1976d2' }}
                >
                    Don't have an account?{' '}
                    <Link
                        href="/signup"
                        sx={{ color: '#115293', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Login;

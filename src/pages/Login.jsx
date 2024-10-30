// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Link,
    IconButton,
    InputAdornment,
    Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('https://backende-fancy.onrender.com/api/user/login', {
                username,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setSuccess('Login successful! Redirecting...');
                
                // Redirect to the home page
                setTimeout(() => navigate('/'), 1500); // Delay for showing success message
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Login failed!');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: 3,
                    padding: 4,
                    borderRadius: 2,
                    bgcolor: 'background.paper'
                }}
            >
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Login
                </Typography>

                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{success}</Alert>}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Link href="/forgot-password" variant="body2" underline="hover">
                            Forgot Password?
                        </Link>
                        <Link href="/signup" variant="body2" underline="hover">
                            Don’t have an account? Sign Up
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;

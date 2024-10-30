import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Adjust the import path to your AuthContext
import { jwtDecode } from 'jwt-decode'; // Correct import for jwtDecode

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login method from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backende-fancy.onrender.com/api/user/login', { email, password });
      if (response.data.success) {
        console.log('Login successful');
        login(response.data.token); // Call the login function from context
        setError('');

        // Check if the user is an admin based on the decoded token
        const decoded = jwtDecode(response.data.token);
        if (decoded.isAdmin) {
          navigate('/admin'); // Navigate to the admin page for admins
        } else {
          navigate('/'); // Redirect to the homepage for regular users
        }
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Error occurred. Please try again.');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
          <Link href="#" variant="body2" underline="hover">
            Forgot Your Password?
          </Link>
          <RouterLink to="/signup" style={{ textDecoration: 'none' }}>
            <Link variant="body2" underline="hover">
              Don't have an account? Sign Up
            </Link>
          </RouterLink>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;


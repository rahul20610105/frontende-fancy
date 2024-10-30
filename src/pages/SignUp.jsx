import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);  // Checkbox for admin status
  const [adminKey, setAdminKey] = useState('');   // Extra field for admin verification
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backende-fancy.onrender.com/api/user/register', {
        username,
        name,
        email,
        password,
        isAdmin,        // Send admin status to backend
        adminKey        // Send admin key for verification
      });

      if (response.data.success) {
        navigate('/login');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Sign Up</Typography>
        <form onSubmit={handleSignUp}>
          <TextField label="Name" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Username" variant="outlined" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField label="Password" type={showPassword ? 'text' : 'password'} variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" aria-label="toggle password visibility">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }} />
          {/* Checkbox for admin registration */}
          <FormControlLabel control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />} label="Register as Admin" />
          {isAdmin && (
            <TextField label="Admin Key" variant="outlined" fullWidth margin="normal" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} />
          )}
          {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
        </form>
        <Box sx={{ mt: 2 }}>
          <Link component={RouterLink} to="/login" variant="body2" underline="hover" style={{ textDecoration: 'none' }}>Already have an account? Login</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;

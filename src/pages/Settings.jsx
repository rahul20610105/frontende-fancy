import React from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container sx={{ paddingY: 4, marginTop: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Settings
      </Typography>
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        gap={2}
      >
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: 'blue', 
            color: 'white', 
            width: '300px', 
            height: '50px',
            '&:hover': {
              backgroundColor: 'darkblue'
            }
          }} 
          onClick={() => handleNavigation('/edit-profile')}
        >
          Edit Profile
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: 'green', 
            color: 'white', 
            width: '300px', 
            height: '50px',
            '&:hover': {
              backgroundColor: 'darkgreen'
            }
          }} 
          onClick={() => handleNavigation('/help-center')}
        >
          Help Center
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: 'orange', 
            color: 'white', 
            width: '300px', 
            height: '50px',
            '&:hover': {
              backgroundColor: 'darkorange'
            }
          }} 
          onClick={() => handleNavigation('/rate-the-app')}
        >
          Rate the App
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: 'purple', 
            color: 'white', 
            width: '300px', 
            height: '50px',
            '&:hover': {
              backgroundColor: 'darkpurple'
            }
          }} 
          onClick={() => handleNavigation('/favourites')}
        >
          Favourites
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: 'teal', 
            color: 'white', 
            width: '300px', 
            height: '50px',
            '&:hover': {
              backgroundColor: 'darkcyan'
            }
          }} 
          onClick={() => handleNavigation('/register-business')}
        >
          Register My Business Account
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: 'red', 
            color: 'white', 
            width: '300px', 
            height: '50px',
            '&:hover': {
              backgroundColor: 'darkred'
            }
          }} 
          onClick={() => handleNavigation('/account-termination')}
        >
          Account Termination
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;

import React from 'react';
import { Box, Typography, Grid, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn, Phone, Email, Policy, LocalShipping } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Define some custom styles for the footer
const customStyles = {
  footer: {
    backgroundColor: '#222',
    color: '#fff',
    padding: '20px 10px', // Reduced padding for a slimmer footer
    textAlign: 'center',
    position: 'relative',
    bottom: 0,
    width: '100%',
    zIndex: 2,
  },
  logo: {
    fontFamily: "'Pacifico', cursive",
    fontSize: '1.5rem', // Slightly smaller logo size
    color: '#FF5733',
    letterSpacing: '1px',
    marginBottom: '10px',
    textShadow: '2px 2px 5px rgba(0,0,0,0.5)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.2)', // Logo hover animation
    },
  },
  socialIcon: {
    color: '#fff',
    fontSize: '1.5rem', // Slightly smaller icons
    transition: 'color 0.3s ease, transform 0.3s ease-in-out',
    '&:hover': {
      color: '#FF5733', // Change color on hover
      transform: 'scale(1.2)', // Scale on hover
    },
  },
  copyright: {
    marginTop: '10px', // Reduced margin for copyright
    fontSize: '0.75rem', // Smaller font size for copyright
    color: '#aaa',
  },
  description: {
    textAlign: 'left',
    marginBottom: '10px', // Reduced margin for description
    color: '#ddd',
  },
  heading: {
    color: '#FF5733',
    marginBottom: '5px', // Reduced margin for heading
  },
  linksList: {
    textAlign: 'left',
  },
};

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screen

  return (
    <Box sx={customStyles.footer}>
      {/* Company Logo */}
      <Typography variant="h3" component="div" sx={customStyles.logo}>
        E-Fancy
      </Typography>

      <Grid container spacing={4} justifyContent="space-between" alignItems="center">
        {/* Left Section: About Description */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" component="div" sx={customStyles.heading}>
            About
          </Typography>
          <Typography variant="body1" sx={customStyles.description}>
            E-Fancy is your go-to platform for finding the latest trends in fashion and lifestyle. Our aim is to provide an exquisite collection that resonates with elegance and sophistication.
          </Typography>
        </Grid>

        {/* Center Section: Social Media Icons */}
        <Grid item xs={12} sm={4} container justifyContent="center">
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <IconButton aria-label="Facebook" href="https://facebook.com" target="_blank">
                <Facebook sx={customStyles.socialIcon} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="Instagram" href="https://instagram.com" target="_blank">
                <Instagram sx={customStyles.socialIcon} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="Twitter" href="https://twitter.com" target="_blank">
                <Twitter sx={customStyles.socialIcon} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="LinkedIn" href="https://linkedin.com" target="_blank">
                <LinkedIn sx={customStyles.socialIcon} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Section: Links */}
        <Grid item xs={12} sm={4}>
          <List sx={customStyles.linksList}>
            <ListItem>
              <Phone sx={{ marginRight: '8px' }} />
              <ListItemText primary="Contact Us" />
            </ListItem>
            <ListItem>
              <Email sx={{ marginRight: '8px' }} />
              <ListItemText primary="Email Support" />
            </ListItem>
            <ListItem>
              <Policy sx={{ marginRight: '8px' }} />
              <ListItemText primary="Privacy Policy" />
            </ListItem>
            <ListItem>
              <LocalShipping sx={{ marginRight: '8px' }} />
              <ListItemText primary="Delivery Information" />
            </ListItem>
          </List>
        </Grid>
      </Grid>

      {/* Company Information and Links */}
      <Typography variant="body2" sx={customStyles.copyright}>
        &copy; {new Date().getFullYear()} E-Fancy. All rights reserved.
      </Typography>
    </Box>
  );
}

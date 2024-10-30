import React from 'react';
import { Box, Typography } from '@mui/material';
// import ExchangeIcon from "../assets/exchangeicon.png"; // Replace with your actual asset paths
// import ReturnIcon from '../assets/return-icon.png';
// import ServiceIcon from '../assets/service-icon.png';

const OurPolicy = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between', // Even spacing between icons
        alignItems: 'center',
        flexWrap: 'wrap', // Wrap on smaller screens
        padding: '20px',
        backgroundColor: '#f9f9f9', // Light background for better visibility
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      {/* Exchange Policy */}
      <Box
        sx={{
          flex: '1 1 30%', // Responsive: Adjusts size based on screen width
          padding: '10px',
          textAlign: 'center',
        }}
      >
        <img
          src="/assets/exchange.png"
          alt="Exchange Policy"
          style={{ width: '80px', height: '80px', marginBottom: '10px' }} // Icon size
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Exchange Policy
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Easily exchange your products within 30 days.
        </Typography>
      </Box>

      {/* Return Policy */}
      <Box
        sx={{
          flex: '1 1 30%', // Responsive
          padding: '10px',
          textAlign: 'center',
        }}
      >
        <img
          src='/public/assets/quality.jpg'
          alt="Return Policy"
          style={{ width: '80px', height: '80px', marginBottom: '10px' }} // Icon size
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Return Policy
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Get a full refund if you're not satisfied within 30 days.
        </Typography>
      </Box>

      {/* Best Services Policy */}
      <Box
        sx={{
          flex: '1 1 30%', // Responsive
          padding: '10px',
          textAlign: 'center',
        }}
      >
        <img
          src='/public/assets/support.png'
          alt="Best Services Policy"
          style={{ width: '80px', height: '80px', marginBottom: '10px' }} // Icon size
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Best Services
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Enjoy top-notch services with our dedicated support team.
        </Typography>
      </Box>
    </Box>
  );
};

export default OurPolicy;

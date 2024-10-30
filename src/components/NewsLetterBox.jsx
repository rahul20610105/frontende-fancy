import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Fade } from '@mui/material';

const NewsLetterBox = () => {
  const [email, setEmail] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Handle subscription logic here
    console.log("Email submitted:", email); // For demonstration, you can replace this with actual logic

    // Clear the email input field
    setEmail('');
  };

  return (
    <Fade in={true} timeout={1000}>
      <Box
        className="flex-col"
        sx={{
          padding: 3,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          boxShadow: 2,
          textAlign: 'center',
          animation: 'fadeIn 1s',
          margin: 'auto',
          maxWidth: '600px',
        }}
      >
        <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          Subscribe Now and Get 20% Off!
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', marginBottom: 2 }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat aliquam qui nihil odit facilis totam!
        </Typography>
        <form onSubmit={onSubmitHandler} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="Enter your email"
            type="email"
            required
            value={email} // Bind the input value to the state
            onChange={(e) => setEmail(e.target.value)} // Update state on change
            sx={{
              width: { xs: '70%', sm: '300px' }, // Responsive width
              marginRight: 1,
            }}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Fade>
  );
};

export default NewsLetterBox;

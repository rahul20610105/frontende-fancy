import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();
  const [carouselImages, setCarouselImages] = useState([]);

  // Static images array
  const staticImages = [
    { url: '/assets/carosel1.jpg', id: 1 }, // Add unique IDs for redirection
    { url: '/assets/carosel2.jpg', id: 2 },
    { url: '/assets/carosel3.jpg', id: 3 },
  ];

  // Use static images for now
  useEffect(() => {
    setCarouselImages(staticImages);
  }, []);

  const handleNavigation = () => {
    navigate('/place-order');
  };

  const handleImageClick = (id) => {
    navigate(`/ProductItem/${id}`); // Adjust the route as needed
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '60vh',
        position: 'relative',
        mt: '-10px',
        zIndex: '-1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        padding: '0px',
        boxSizing: 'border-box',
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          width: '100%',
          maxWidth: '2000px',
          margin: '0 auto',
          padding: isMobile ? '16px' : isTablet ? '32px' : '64px',
        }}
      >
        {/* Left Side Content */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left',
            gap: '16px',
          }}
        >
          {/* Main Heading */}
          <Typography
            variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h3'}
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: '#FF5733',
              position: 'relative',
              mb: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: isMobile ? '-16px' : '-32px',
                top: '50%',
                width: isMobile ? '16px' : '32px',
                height: '2px',
                bgcolor: '#FF5733',
              },
            }}
          >
            Our Best Seller
          </Typography>

          {/* Subheading */}
          <Typography
            variant={isMobile ? 'body1' : isTablet ? 'h6' : 'h5'}
            component="h2"
            sx={{
              color: '#333',
              fontWeight: 400,
              mb: 3,
            }}
          >
            Latest Arrivals
          </Typography>

          {/* "Shop Now" Button */}
          <Button
            variant="contained"
            onClick={handleNavigation}
            sx={{
              bgcolor: '#FF5733',
              padding: isMobile ? '8px 16px' : '10px 24px',
              fontSize: isMobile ? '0.875rem' : isTablet ? '1rem' : '1.125rem',
              fontWeight: 'bold',
              textTransform: 'none',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: '#FF4500',
              },
            }}
          >
            Shop Now
          </Button>
        </Grid>

        {/* Right Side - Carousel */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Carousel
            showArrows={true}
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={3000}
            dynamicHeight={true}
            // sx={{
            //   width: '100%',
            //   height: isMobile ? 'auto' : '400px',
            // }}
          >
            {carouselImages.map((image, index) => (
              <div key={index} onClick={() => handleImageClick(image.id)} style={{ cursor: 'pointer' }}>
                <img
                  src={image.url}
                  alt={`Carousel Slide ${index + 1}`}
                  style={{ width: '100%', height: isMobile ? 'auto' : '400px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}

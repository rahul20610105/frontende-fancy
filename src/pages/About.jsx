import React from 'react';
import { Container, Grid, Typography, Box, Button, Card, CardContent } from '@mui/material';

const About = () => {
  return (
    <Container sx={{ marginTop: 8, paddingY: 5 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left side - Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/assets/aboutpic.png"  // Replace with your image path
            alt="E-Fancy company"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>

        {/* Right side - Short Description */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: "'Roboto Slab', serif",  // Custom font for headings
              fontWeight: 'bold',
              color: '#2C3E50',
            }}
          >
            About E-Fancy
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontFamily: "'Open Sans', sans-serif",  // Different font for body text
              color: '#555',
              lineHeight: 1.8,
            }}
          >
            E-Fancy is a leading e-commerce company that started with a vision to revolutionize the
            shopping experience. With a strong commitment to quality and customer satisfaction,
            E-Fancy has grown to become a trusted name in the industry, offering a wide range of
            products from top brands at competitive prices.
          </Typography>
        </Grid>
      </Grid>

      {/* Points and Brief Description */}
      <Box sx={{ marginTop: 5 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontFamily: "'Roboto Slab', serif",
            color: '#1A5276',
            textAlign: 'center',
          }}
        >
          Why Choose E-Fancy?
        </Typography>

        <Grid container spacing={4}>
          {/* Positive Point 1 */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                boxShadow: 5,
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: '0.3s ease-in-out',
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: "'Roboto Slab', serif",
                    fontWeight: 'bold',
                    color: '#2980B9',
                  }}
                >
                  High-Quality Products
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontFamily: "'Open Sans', sans-serif",
                    color: '#7F8C8D',
                  }}
                >
                  We offer only the best products from top brands, ensuring that every purchase you
                  make meets your standards for quality.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Positive Point 2 */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                boxShadow: 5,
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: '0.3s ease-in-out',
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: "'Roboto Slab', serif",
                    fontWeight: 'bold',
                    color: '#27AE60',
                  }}
                >
                  Fast and Reliable Shipping
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontFamily: "'Open Sans', sans-serif",
                    color: '#7F8C8D',
                  }}
                >
                  Our partnership with top courier services ensures that your orders reach you in no
                  time, no matter where you are.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Positive Point 3 */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                boxShadow: 5,
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: '0.3s ease-in-out',
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: "'Roboto Slab', serif",
                    fontWeight: 'bold',
                    color: '#E67E22',
                  }}
                >
                  24/7 Customer Support
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontFamily: "'Open Sans', sans-serif",
                    color: '#7F8C8D',
                  }}
                >
                  We believe in going the extra mile. Our customer support team is available around
                  the clock to assist you with any queries.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Learn More Button */}
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            fontFamily: "'Roboto Slab', serif",
            backgroundColor: '#3498DB',
            '&:hover': {
              backgroundColor: '#2980B9',
            },
            paddingX: 4,
            paddingY: 1.5,
          }}
        >
          Learn More About Us
        </Button>
      </Box>
    </Container>
  );
};

export default About;

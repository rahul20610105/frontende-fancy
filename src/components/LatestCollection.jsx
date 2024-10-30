import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { ShopContext } from '../context/ShopContext';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Container } from '@mui/material';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: 'Poppins, sans-serif',
          color: '#ff6f61',
          textAlign: 'center',
          marginBottom: 4,
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        Latest Collection
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item key={product.id} xs={4} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  maxWidth: 345,
                  margin: '0 auto',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.05)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  },
                  cursor: 'pointer',  // Make the card clickable
                }}
                onClick={() => handleClick(product.id)} // Handle click to navigate
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    height: 200,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography> */}
                  <Box mt={2}>
                    <Typography variant="h6" color="text.primary">
                      {product.price} {product.currency}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center">
            No products available.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default LatestCollection;

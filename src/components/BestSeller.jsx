import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BestSeller = () => {
  const { products = [] } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const bestProduct = products.filter((item) => item.BestSeller === "true");
    setBestSeller(bestProduct.slice(0, 10)); // Limit to top 10 products
  }, [products]);

  return (
    <Box sx={{ padding: '2rem 1rem', textAlign: 'center' }}>
      {/* Best Seller Title */}
      <Typography
        variant="h3"
        sx={{
          marginBottom: '1rem',
          color: '#FF5733',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
        }}
      >
        BESTSELLER
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        sx={{
          marginBottom: '1.5rem',
          color: '#555',
          fontFamily: 'Arial, sans-serif',
          fontSize: '1.25rem',
        }}
      >
        Discover our top-rated products that everyone loves!
      </Typography>

      {/* Grid Layout for Best Sellers */}
      <Grid container spacing={3} justifyContent="center">
        {bestSeller.map((product) => (
          <Grid item xs={4} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                height: '100%', // Ensure card takes full height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Attractive shadow effect
                transition: 'transform 0.3s ease', // Hover effect
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Product Image */}
              <CardMedia
                component="img"
                sx={{
                  height: { xs: '250px', sm: '250px', md: '250px' }, // Maintain consistent height across screen sizes
                  width: '100%', // Full width for the image
                  objectFit: 'cover', // Cover the image area
                  borderRadius: '10px 10px 0 0', // Rounded corners at the top
                }}
                image={product.image}
                alt={product.name}
              />
              
              {/* Card Content */}
              <CardContent
                sx={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  textAlign: 'center',
                }}
              >
                {/* Product Name */}
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                >
                  {product.name}
                </Typography>

                {/* Product Price */}
                <Typography
                  variant="h6"
                  sx={{
                    color: '#FF5733',
                    fontWeight: 'bold',
                  }}
                >
                  {product.currency}{product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BestSeller;

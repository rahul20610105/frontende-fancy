import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

// Related Products Component
const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      let filteredProducts = products;
      if (category || subCategory) {
        filteredProducts = products.filter(
          (item) =>
            (!category || item.category === category) &&
            (!subCategory || item.subCategory === subCategory)
        );
      }

      // If no products match the filters, show random products
      if (filteredProducts.length === 0) {
        filteredProducts = products;
      }

      setRelated(filteredProducts.slice(0, 5)); // Limit to 5 related products
    }
  }, [products, category, subCategory]);

  const handleProductClick = (id) => {
    // Scroll to top and navigate to the product page
    window.scrollTo(0, 0);
    navigate(`/product/${id}`);
  };

  return (
    <Box mt={4}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          marginLeft: "150px",
          textAlign: "center",
          fontSize: { xs: "1.5rem", md: "2rem" },
          justifyContent: "center",
         
        }}
      >
        Related Products
      </Typography>
      <Grid container spacing={3}>
        {related.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{ maxWidth: 345, cursor: "pointer" }}
              onClick={() => handleProductClick(product.id)}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price} {product.currency}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProduct;

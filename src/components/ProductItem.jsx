import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext"; // Import AuthContext to check authentication
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import RelatedProduct from "./RelatedProduct";

// Main ProductItem Component
const ProductItem = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const { isAuthenticated } = useAuth(); // Get isAuthenticated from Auth context
  const navigate = useNavigate();
  const product = products?.find((p) => p.id === parseInt(id));

  const [selectedImage, setSelectedImage] = useState(product?.image || "");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(""); // State for size
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedColor(product.colors[0]);
    }

    // Scroll to top whenever product changes
    window.scrollTo(0, 0);
  }, [id, product]);

  if (!product) {
    return (
      <Container>
        <Typography variant="h4" align="center" sx={{ marginTop: 4 }}>
          Product not found
        </Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    // Check if the user is authenticated
    if (!isAuthenticated) {
      alert("Please log in to add items to your cart.");
      return;
    }

    // Check if size and quantity are selected
    if (!selectedSize || selectedQuantity <= 0) {
      setErrorMessage("Please select a size and a valid quantity.");
      return;
    }

    setErrorMessage(""); // Clear any previous error
    const cartItem = {
      ...product,
      quantity: selectedQuantity,
      color: selectedColor,
      size: selectedSize, // Include selected size in the cart item
    };
    addToCart(cartItem, selectedQuantity);
    navigate("/cart");
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 4, marginTop: 7 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={selectedImage}
            alt={product.name}
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Box display="flex" gap={2} mt={2}>
            {product.additionalImages &&
              product.additionalImages.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`${product.name} - view ${index + 1}`}
                  sx={{
                    width: "20%",
                    height: "auto",
                    cursor: "pointer",
                    borderRadius: 1,
                    border: selectedImage === image ? "2px solid #1976d2" : "1px solid #ddd",
                    "&:hover": { border: "2px solid #1976d2" },
                  }}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            {product.price} {product.currency}
          </Typography>

          <Box mt={2}>
            <FormControl sx={{ width: "100px" }}>
              <TextField
                type="number"
                label="Quantity"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </FormControl>
          </Box>

          {/* Size Selection */}
          <Box mt={2}>
            <FormControl fullWidth>
              <InputLabel>Choose Size</InputLabel>
              <Select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {/* Size Options */}
                {["S", "M", "L", "XL", "XXL", "XXXL"].map((size, index) => (
                  <MenuItem key={index} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box mt={2}>
            <FormControl fullWidth>
              <InputLabel>Choose Color</InputLabel>
              <Select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {product.colors.map((color, index) => (
                  <MenuItem key={index} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {errorMessage && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleAddToCart}
            disabled={!selectedColor || selectedQuantity <= 0 || !selectedSize} // Disable button if size or quantity isn't selected
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>

      {/* Related Products Section */}
      <RelatedProduct category={product.category} subCategory={product.subCategory} />
    </Container>
  );
};

export default ProductItem;

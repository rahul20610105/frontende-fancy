import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Container, Typography, Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItem } = useContext(ShopContext);
  const [editItemId, setEditItemId] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);
  const [newSize, setNewSize] = useState('');

  const navigate = useNavigate(); // Initialize navigate function
  const shippingFee = 10.00; // Fixed shipping fee

  const handleEditClick = (item) => {
    setEditItemId(item.id);
    setNewQuantity(item.quantity);
    setNewSize(item.size || ''); // Set the current size or empty if not set
  };

  const handleUpdate = (itemId) => {
    console.log("Updating item:", itemId, "New quantity:", newQuantity, "New size:", newSize);

    // Convert newQuantity to a number before updating
    const quantity = Number(newQuantity);
    
    // Call the update function
    updateCartItem(itemId, quantity, newSize);
    
    // Reset fields and close edit mode
    setEditItemId(null); 
    setNewQuantity(1); // Reset quantity
    setNewSize(''); // Reset size
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalWithShipping = total + shippingFee;
    return totalWithShipping; // Return total price without formatting for easier use later
  };

  const handlePlaceOrder = () => {
    const totalPrice = calculateTotalPrice(); // Calculate total price
    navigate('/place-order', { state: { totalPrice } }); // Pass total price as state
  };

  return (
    <Container sx={{ paddingY: 4, marginTop: 7 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        cartItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              border: '1px solid #ddd',
              borderRadius: 2,
              padding: 2,
              margin: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap', // Ensure wrapping on smaller screens
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                alt={item.name}
                src={item.image}
                sx={{ width: 80, height: 80 }}
              />
              <Box>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">
                  {item.price} {item.currency} x {item.quantity} = {(item.price * item.quantity).toFixed(2)} {item.currency}
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              gap={2}
              sx={{
                maxWidth: '100%',
                overflowX: 'auto',
              }}
            >
              {editItemId === item.id ? (
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    maxWidth: '100%',
                    overflowX: 'auto',
                    padding: '8px',
                  }}
                >
                  <Box>
                    <Typography variant="caption" display="block">
                      Edit Quantity
                    </Typography>
                    <TextField
                      type="number"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(Number(e.target.value))} // Ensure this is a number
                      sx={{ width: '100px' }}
                      inputProps={{ min: 1 }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="caption" display="block">
                      Edit Size
                    </Typography>
                    <FormControl sx={{ width: '100px' }}>
                      <InputLabel>Size</InputLabel>
                      <Select
                        value={newSize}
                        onChange={(e) => setNewSize(e.target.value)}
                      >
                        <MenuItem value="">Select Size</MenuItem>
                        <MenuItem value="S">S</MenuItem>
                        <MenuItem value="M">M</MenuItem>
                        <MenuItem value="L">L</MenuItem>
                        <MenuItem value="XL">XL</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(item.id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditItemId(null)}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Box display="flex" gap={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        ))
      )}
      <Typography variant="h5" align="right" sx={{ marginTop: 2 }}>
        Total Price (incl. $10 shipping): ${calculateTotalPrice().toFixed(2)}
      </Typography>

      {/* Place Order button */}
      {cartItems.length > 0 && (
        <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handlePlaceOrder} // Call handlePlaceOrder function
          >
            Place Order
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Cart;

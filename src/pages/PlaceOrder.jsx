import React, { useState, useContext } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Orders from "../pages/OrderHistory";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
  });
  const [mobilePaymentDetails, setMobilePaymentDetails] = useState({
    accountNumber: '',
    password: '',
  });
  const [selectedMobileApp, setSelectedMobileApp] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { cartItems, shippingFee, addOrder } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  const validateCardDetails = () => {
    const { cardNumber, expiryDate, cvv } = cardDetails;
    return (
      cardNumber.length === 16 &&
      /^\d{2}\/\d{2}$/.test(expiryDate) &&
      cvv.length === 3
    );
  };

  const isOrderButtonDisabled = !(
    paymentMethod === 'cash' ||
    (paymentMethod === 'card' && validateCardDetails()) ||
    (paymentMethod === 'mobile' && mobilePaymentDetails.accountNumber && mobilePaymentDetails.password)
  ) || Object.values(shippingInfo).some(field => !field);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    if (event.target.value !== 'mobile') {
      setSelectedMobileApp('');
    }
  };

  const handleShippingChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleMobilePaymentChange = (event) => {
    const { name, value } = event.target;
    setMobilePaymentDetails({ ...mobilePaymentDetails, [name]: value });
  };

  const handleAppClick = (appName) => {
    setPaymentMethod('mobile');
    setSelectedMobileApp(appName);
  };

  const handlePlaceOrder = () => {
    // Create order object
    const order = {
      items: cartItems,
      totalPrice: totalPrice + shippingFee, // Including shipping fee
      shippingInfo,
      paymentMethod,
      status: 'Pending', // Initial status
      createdAt: new Date(),
    };

    // Add order to the context (to be stored)
    addOrder(order);
    setOrderPlaced(true);
    setTimeout(() => {
      navigate('/order-history'); // 
    }, 2000);
  };

  return (
    <Container sx={{ paddingY: 4, marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Place Order
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Shipping Information
          </Typography>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={handleShippingChange}
            required
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            required
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            name="city"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            required
          />
          <TextField
            label="Postal Code"
            fullWidth
            margin="normal"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleShippingChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Country</InputLabel>
            <Select
              name="country"
              value={shippingInfo.country}
              onChange={handleShippingChange}
              required
            >
              <MenuItem value="Nepal">Nepal</MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="Bhutan">Bhutan</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleShippingChange}
            required
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            value={shippingInfo.email}
            onChange={handleShippingChange}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Payment Method
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Payment Method</InputLabel>
            <Select
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <MenuItem value="cash">Cash on Delivery</MenuItem>
              <MenuItem value="card">Card</MenuItem>
              <MenuItem value="mobile">Mobile Payment</MenuItem>
            </Select>
          </FormControl>

          {paymentMethod === 'card' && (
            <Box mt={2}>
              <TextField
                label="Card Number"
                fullWidth
                margin="normal"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                }
                required
              />
              <TextField
                label="Expiry Date (MM/YY)"
                fullWidth
                margin="normal"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                }
                required
              />
              <TextField
                label="CVV"
                fullWidth
                margin="normal"
                name="cvv"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
                required
              />
            </Box>
          )}

          {paymentMethod === 'mobile' && (
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Select Mobile Payment App
              </Typography>
              <Box display="flex" gap={2} mb={2}>
                <Button
                  variant={selectedMobileApp === 'App1' ? 'contained' : 'outlined'}
                  onClick={() => handleAppClick('App1')}
                >
                  App1
                </Button>
                <Button
                  variant={selectedMobileApp === 'App2' ? 'contained' : 'outlined'}
                  onClick={() => handleAppClick('App2')}
                >
                  App2
                </Button>
                <Button
                  variant={selectedMobileApp === 'App3' ? 'contained' : 'outlined'}
                  onClick={() => handleAppClick('App3')}
                >
                  App3
                </Button>
              </Box>
              {selectedMobileApp && (
                <>
                  <TextField
                    label="Account Number"
                    fullWidth
                    margin="normal"
                    name="accountNumber"
                    value={mobilePaymentDetails.accountNumber}
                    onChange={handleMobilePaymentChange}
                    required
                  />
                  <TextField
                    label="Password"
                    fullWidth
                    margin="normal"
                    name="password"
                    type="password"
                    value={mobilePaymentDetails.password}
                    onChange={handleMobilePaymentChange}
                    required
                  />
                </>
              )}
            </Box>
          )}
        </Grid>
      </Grid>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Typography variant="h6">Total: ${totalPrice.toFixed(2) + shippingFee}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
          disabled={isOrderButtonDisabled}
        >
          Place Order
        </Button>
      </Box>

      <Snackbar
        open={orderPlaced}
        autoHideDuration={3000}
        onClose={() => setOrderPlaced(false)}
        message="Order placed successfully!"
      />
    </Container>
  );
};

export default PlaceOrder;

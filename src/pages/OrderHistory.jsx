import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from '@mui/material';

const Orders = () => {
  const { orders } = useContext(ShopContext);

  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <React.Fragment key={index}>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        src={item.image} // Ensure this matches the image property in your product
                        alt={item.name}
                        style={{
                          borderRadius: '50%',
                          width: '50px',
                          height: '50px',
                        }}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" color="error">
                        Cancel Order
                      </Button>
                      <Button variant="outlined" color="primary" sx={{ marginLeft: 1 }}>
                        Return Order
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Orders;

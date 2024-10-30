// import React, { useContext, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { Container, Typography, Box, Button, Grid, CardMedia, Stack } from '@mui/material';

// const Orders = ({ isAdmin }) => { // Accept isAdmin as a prop
//   const { orders, setOrders } = useContext(ShopContext);
//   const [trackingStatus, setTrackingStatus] = useState({});

//   // Logic to cancel a product
//   const handleCancel = (orderIndex, productIndex) => {
//     setOrders((prevOrders) => {
//       return prevOrders.map((order, oIndex) => {
//         if (oIndex === orderIndex) {
//           // Allow cancellation only if order is not dispatched
//           if (order.status !== 'Ready to Ship' && order.status !== 'On the Way') {
//             const updatedProducts = order.products.filter((_, pIndex) => pIndex !== productIndex);
//             return { ...order, products: updatedProducts };
//           }
//         }
//         return order;
//       });
//     });
//   };

//   // Logic to track an order
//   const handleTrackItem = (orderIndex) => {
//     const statusOptions = ['Processing', 'Ready to Ship', 'On the Way', 'Delayed', 'Delivered'];
//     const currentStatus = trackingStatus[orderIndex] || statusOptions[0];

//     const nextStatus =
//       currentStatus === 'Delivered'
//         ? 'Delivered'
//         : statusOptions[statusOptions.indexOf(currentStatus) + 1];

//     setTrackingStatus((prevStatus) => ({
//       ...prevStatus,
//       [orderIndex]: nextStatus,
//     }));
//   };

//   // Logic to allow admin to change tracking status
//   const handleAdminStatusChange = (orderIndex, newStatus) => {
//     setOrders((prevOrders) => {
//       return prevOrders.map((order, oIndex) => {
//         if (oIndex === orderIndex) {
//           return { ...order, status: newStatus };
//         }
//         return order;
//       });
//     });
//   };

//   return (
//     <Container sx={{ paddingY: 4, marginTop: 7 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Your Orders
//       </Typography>
//       {orders.length === 0 ? (
//         <Typography variant="h6" align="center">
//           You have no orders yet.
//         </Typography>
//       ) : (
//         orders.map((order, orderIndex) => (
//           <Box key={orderIndex} sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 3, marginY: 3 }}>
//             <Typography variant="h6" sx={{ marginBottom: 2 }}>
//               Order #{orderIndex + 1}
//             </Typography>

//             {order.products && order.products.length > 0 ? (
//               <Stack spacing={2}>
//                 {order.products.map((product, productIndex) => (
//                   <Grid container key={productIndex} spacing={2} alignItems="center">
//                     <Grid item xs={12} sm={3}>
//                       <CardMedia
//                         component="img"
//                         image={product.image}
//                         alt={product.name}
//                         sx={{ width: '100%', height: 'auto', borderRadius: 1 }}
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={9}>
//                       <Stack spacing={1}>
//                         <Typography variant="h6">{product.name}</Typography>
//                         <Typography variant="body2">Quantity: {product.quantity}</Typography>
//                         <Typography variant="body2">Size: {product.size}</Typography>
//                         <Typography variant="body2">Total: ${product.price.toFixed(2)}</Typography>

//                         <Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
//                           <Button
//                             variant="contained"
//                             color="error"
//                             onClick={() => handleCancel(orderIndex, productIndex)}
//                             disabled={order.status === 'Ready to Ship' || order.status === 'On the Way'}
//                           >
//                             Cancel Order
//                           </Button>
//                           <Button variant="outlined" color="primary" onClick={() => handleTrackItem(orderIndex)}>
//                             {trackingStatus[orderIndex] ? trackingStatus[orderIndex] : 'Track Item'}
//                           </Button>
//                         </Stack>
//                       </Stack>
//                     </Grid>
//                   </Grid>
//                 ))}
//               </Stack>
//             ) : (
//               <Typography variant="body2">No products in this order.</Typography>
//             )}

//             <Box sx={{ marginTop: 3 }}>
//               <Typography variant="body1">Order Status: {trackingStatus[orderIndex] || order.status}</Typography>
//               <Typography variant="body1">Payment Method: {order.paymentMethod}</Typography>
//               <Typography variant="body1">Shipping Information:</Typography>
//               <Typography variant="body2">Name: {order.shippingInfo.fullName}</Typography>
//               <Typography variant="body2">Address: {order.shippingInfo.address}</Typography>

//               {/* Admin Controls for changing tracking status */}
//               {isAdmin && (
//                 <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
//                   {['Processing', 'Ready to Ship', 'On the Way', 'Delayed', 'Delivered'].map((status) => (
//                     <Button
//                       key={status}
//                       variant="contained"
//                       onClick={() => handleAdminStatusChange(orderIndex, status)}
//                     >
//                       Set to {status}
//                     </Button>
//                   ))}
//                 </Stack>
//               )}
//             </Box>
//           </Box>
//         ))
//       )}
//     </Container>
//   );
// };

// export default Orders;

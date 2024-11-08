import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Typography, Box } from '@mui/material';
import { Menu as MenuIcon, Dashboard, ShoppingCart, Add, LocalOffer, DirectionsBike, ExitToApp } from '@mui/icons-material';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Use the custom hook
import DashboardPage from '../AdminPages/DashboardPage';
import OrdersPage from '../AdminPages/OrdersPage';
import AddProductPage from '../AdminPages/AddProductPage';
import DiscountPage from '../AdminPages/DiscountPage';
import RiderInfoPage from '../AdminPages/RiderInfoPage';

const AdminPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { userRole } = useAuth();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuClick = (page, path) => {
    if (page === 'Logout') {
      localStorage.removeItem('token');
      navigate('/');
      return;
    }
    navigate(path);
    if (window.innerWidth < 900) {
      setIsDrawerOpen(false);
    }
  };

  const drawerItems = [
    { text: 'Dashboard', icon: <Dashboard />, color: '#4caf50', path: 'dashboard' },
    { text: 'Online Orders', icon: <ShoppingCart />, color: '#ff9800', path: 'online-orders' },
    { text: 'Add Products', icon: <Add />, color: '#3f51b5', path: 'add-products' },
    { text: 'Discount', icon: <LocalOffer />, color: '#f44336', path: 'discount' },
    { text: 'Rider Info', icon: <DirectionsBike />, color: '#9c27b0', path: 'rider-info' },
    { text: 'Logout', icon: <ExitToApp />, color: '#2196f3', path: '/' },
  ];

  return userRole === 'admin' ? (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: '#333' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={isDrawerOpen || window.innerWidth >= 900}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        <Toolbar />
        <Box role="presentation" sx={{ width: 250, padding: 2 }}>
          <List>
            {drawerItems.map((item) => (
              <ListItem
                button
                key={item.text}
                sx={{ color: item.color }}
                onClick={() => handleMenuClick(item.text, item.path)}
              >
                <ListItemIcon sx={{ color: item.color }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: { xs: 0, md: 30 },
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="online-orders" element={<OrdersPage />} />
          <Route path="add-products" element={<AddProductPage />} />
          <Route path="discount" element={<DiscountPage />} />
          <Route path="rider-info" element={<RiderInfoPage />} />
        </Routes>
      </Box>
    </div>
  ) : (
    // Optionally, render a "Not Authorized" message or redirect here
    <Typography variant="h5" color="error">
      Not Authorized to view this page.
    </Typography>
  );
};

export default AdminPage;

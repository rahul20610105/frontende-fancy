import React, { useState } from 'react';
import { IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const ProfileIcon = () => {
  const { isAuthenticated, userRole, logout } = useAuth(); // Get userRole from context
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(); // Call logout function from context
    handleClose(); // Close the menu
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the given path
    handleClose(); // Close the menu
  };

  // Only render if the user is authenticated and is a public user (not an admin)
  if (!isAuthenticated || userRole === 'admin') {
    return null;
  }

  return (
    <>
      <Tooltip title="Profile" arrow>
        <IconButton
          onClick={handleClick}
          style={{
            backgroundColor: '#4CAF50',
            color: '#FFFFFF',
            borderRadius: '50%',
            transition: 'background-color 0.3s, transform 0.3s',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#388E3C';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4CAF50';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MenuItem
          onClick={() => handleNavigation('/settings')}
          style={{
            color: '#4CAF50',
            fontWeight: 'bold',
          }}
        >
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => handleNavigation('/order-history')}
          style={{
            color: '#4CAF50',
            fontWeight: 'bold',
          }}
        >
          Order History
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          style={{
            color: '#f44336',
            fontWeight: 'bold',
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileIcon;

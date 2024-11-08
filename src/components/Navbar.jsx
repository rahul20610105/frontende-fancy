import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  Tabs,
  Tab,
  Box,
  Button,
  InputBase,
  CircularProgress,
  debounce,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import ProfileIcon from "./ProfileIcon";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "HOME", href: "/", current: true },
  { name: "ABOUT", href: "/ABOUT", current: false },
  { name: "COLLECTION", href: "/COLLECTION", current: false },
  { name: "TEAM", href: "/team", current: false },
  { name: "CONTACT", href: "/CONTACT", current: false },
];

export default function Navbar() {
  const { cartItems } = useContext(ShopContext);
  const { isAuthenticated, userRole } = useAuth(); // Assume `user` includes role information
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [value, setValue] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
    if (searchVisible) {
      setSearchInput(""); // Clear input when closing
      setSearchResults([]); // Clear previous search results
      setError("");
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileOptionClick = (option) => {
    if (option === "Profile") {
      navigate("/profile");
    } else if (option === "Logout") {
      console.log("User logged out");
    }
    handleCloseUserMenu();
  };

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.trim() === "") {
        setSearchResults([]);
        setError("");
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(`/api/products?search=${query}`);
        setSearchResults(Array.isArray(response.data) ? response.data : []); // Ensure array format
        setError(response.data.length === 0 ? "Product does not exist" : "");
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#FF5733",
        color: "white",
        width: "100%",
        boxShadow: "none",
        padding: isMobile ? 0 : "0 20px",
        overflowX: "hidden",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          padding: isMobile ? "0 8px" : "0",
        }}
      >
        {isMobile && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          component="div"
          sx={{ textAlign: "center", flexGrow: 1 }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img
              src="/assets/logo.webp"
              alt="Your Company"
              style={{ height: "40px", marginRight: "30px" }}
            />
          </Link>
        </Typography>
        {/* Navigation Tabs */}
        {!isMobile && (
          <Box sx={{ flexGrow: 1 }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              centered
              textColor="inherit"
              TabIndicatorProps={{
                sx: { backgroundColor: "white", height: "4px" },
              }}
              sx={{
                "& .MuiTab-root": {
                  minWidth: "100px",
                  padding: "0 12px",
                  marginRight: "8px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&.Mui-selected": { color: "yellow" },
                  "&:hover": {
                    bgcolor: "tomato",
                    color: "#FFD700",
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              {navigation.map((item) => (
                <Tab
                  key={item.name}
                  label={item.name}
                  component={Link}
                  to={item.href}
                />
              ))}
            </Tabs>
          </Box>
        )}
        {/* Search Bar */}
        {searchVisible && (
          <Box sx={{ position: "relative" }}>
            <InputBase
              sx={{
                ml: 1,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "4px",
                padding: "4px 8px",
                height: "36px",
                width: "200px",
              }}
              placeholder="Search…"
              value={searchInput}
              onChange={handleSearchInputChange}
              inputProps={{ "aria-label": "search" }}
            />
            {loading && (
              <CircularProgress
                size={20}
                sx={{
                  position: "absolute",
                  right: 5,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            )}
          </Box>
        )}
        {/* Search Icon */}
        <IconButton color="inherit" onClick={toggleSearch} sx={{ mr: 2 }}>
          <SearchIcon />
        </IconButton>
        {/* Cart Icon */}
        <Link to="/cart" style={{ color: "inherit" }}>
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={totalCartItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
        
        {/* Admin Dashboard Button */}
        {isAuthenticated && userRole === "admin" && (
          <Button
            color="inherit"
            component={Link}
            to="/admin"
            sx={{
              backgroundColor: "#FFD700",
              color: "white",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "6px 16px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#FF4500" },
              transition: "all 0.3s ease-in-out",
              ml: 2,
              alignSelf: "flex-end", // Position on the far-right
            }}
          >
            Admin Dashboard
          </Button>
        )}

        {/* Authentication Buttons */}
        {!isAuthenticated ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                backgroundColor: "#FF5733",
                color: "#333",
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "6px 16px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#FFC107" },
                transition: "all 0.3s ease-in-out",
              }}
            >
              Log In
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/signup"
              sx={{
                backgroundColor: "#FFD700",
                color: "#333",
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "6px 16px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#FFC107" },
                transition: "all 0.3s ease-in-out",
              }}
            >
              Sign Up
            </Button>
          </Box>
        ) : (
          <ProfileIcon
            anchorEl={anchorElUser}
            onOpenUserMenu={handleOpenUserMenu}
            onCloseUserMenu={handleCloseUserMenu}
            handleProfileOptionClick={handleProfileOptionClick}
          />
        )}
      </Toolbar>
      {/* Drawer Menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          width: "250px",
          ".MuiDrawer-paper": {
            width: "250px",
            backgroundColor: "#FF5733",
          },
        }}
      >
        <List>
          {navigation.map((item) => (
            <ListItem
              button
              key={item.name}
              component={Link}
              to={item.href}
              onClick={() => toggleDrawer(false)}
              sx={{
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderBottom: "1px solid white",
                "&:hover": { color: "yellow", backgroundColor: "#FF4500" },
                transition: "all 0.3s ease-in-out",
              }}
            >
              {item.name}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

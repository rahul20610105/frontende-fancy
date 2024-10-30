import { Navigate } from "react-router-dom";
import { products as initialProducts } from "../../public/assets/products"; 
import React, { createContext, useState } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products] = useState(initialProducts || []); // Using static data for products
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");  // Search input state
  const [showSearch, setShowSearch] = useState(false);  // Search bar visibility
  const [searchResults, setSearchResults] = useState([]); // To store the search results
  const [errorMessage, setErrorMessage] = useState(""); // For error message when no results
  const [orders, setOrders] = useState([]); 

  // Static search function filtering the local products list
  const handleSearch = (query) => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredProducts.length > 0) {
      setSearchResults(filteredProducts);
      setErrorMessage(""); // Clear the error message
    } else {
      setSearchResults([]);
      setErrorMessage("No products found.");
    }
  };


  // Function to place an order
  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
    // Clear the cart after placing the order
    setCartItems([]);
  };

  // Add to cart function
  const addToCart = (product, q) => {
    let exists = false;
    setCartItems((prevItems) => prevItems.map((item) => {
      if (item.id === product.id) {
        exists = true;
        return { ...item, quantity: Number(item.quantity) + Number(q) };
      } else {
        exists = false;
        return item;
      }
    }));

    if (!exists) setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateCartItem = (id, q, s) => {
    setCartItems((prevItems) => prevItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: q, size: s };
      } else {
        return item;
      }
    }));
  };

  const currency = " $";
  const shippingFee = 10;

  const value = {
    products,
    currency,
    shippingFee,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    handleSearch,
    searchResults,
    errorMessage,Navigate,
    orders,
    addOrder,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;

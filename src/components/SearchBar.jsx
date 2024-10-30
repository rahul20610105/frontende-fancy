import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Search,Close } from "@mui/icons-material";

const SearchBar = ({ products, setFilteredProducts }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products); // Reset to all products if search query is cleared
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered); // Update products based on search results
    }
    // setSearchQuery(""); // Clear the search bar after search
  };



  const handleCross = () => {
   
    setSearchQuery(""); // Clear the search bar after search
  };


  // Handle changes in search input and update the filtered products dynamically
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle the Enter key press event
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search for products..."
      value={searchQuery}
      onChange={handleInputChange} // Handle input changes
      onKeyDown={handleKeyDown} // Capture Enter key press
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <Search />
         
            </IconButton>
            <IconButton onClick={handleCross}>
         
              <Close/>
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        marginBottom: 2,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#FF5733", // Custom border color
          },
          "&:hover fieldset": {
            borderColor: "#FF5733", // Custom hover color
          },
        },
      }}
    />
  );
};

export default SearchBar;

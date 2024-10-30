import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Collapse,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import { ShopContext } from "../context/ShopContext";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [sortOption, setSortOption] = useState("relevant");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Check if user is logged in by checking for token
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const toggleCategory = (e) => {
    const value = e.target.name;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((cat) => cat !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.name;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((subCat) => subCat !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let filtered = products.slice();

    if (category.length > 0) {
      filtered = filtered.filter((product) => category.includes(product.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((product) => subCategory.includes(product.subCategory));
    }

    if (sortOption === "low-high") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortOption, products]);

  const handleToggleFilters = () => {
    setShowFilterOptions((prev) => !prev);
  };

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (productId) => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart.");
      return;
    }
    // Add to cart logic goes here
    console.log("Product added to cart:", productId);
  };

  return (
    <Box sx={{ padding: "20px", marginTop: "50px" }}>
      {/* SearchBar at the top */}
      <SearchBar products={products} setFilteredProducts={setFilteredProducts} />

      {/* Filters Title with Dropdown Arrow for Mobile */}
      {isMobile && (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={handleToggleFilters}>
            {showFilterOptions ? <ArrowDropUp /> : <ArrowDropDown />}
          </IconButton>
        </Box>
      )}

      <Grid container spacing={2}>
        {/* Filters Section */}
        <Grid item xs={12} sm={3}>
          <Collapse in={showFilterOptions || !isMobile} timeout="auto" unmountOnExit>
            <Typography variant="subtitle1" sx={{ marginBottom: "5px", color: "#FF5733" }}>
              Category
            </Typography>
            <Box sx={{ marginBottom: "15px" }}>
              <FormControlLabel
                control={<Checkbox checked={category.includes("men")} name="men" onChange={toggleCategory} />}
                label="Men"
              />
              <FormControlLabel
                control={<Checkbox checked={category.includes("women")} name="women" onChange={toggleCategory} />}
                label="Women"
              />
              <FormControlLabel
                control={<Checkbox checked={category.includes("kids")} name="kids" onChange={toggleCategory} />}
                label="Kids"
              />
            </Box>

            <Typography variant="subtitle1" sx={{ marginBottom: "5px", color: "#FF5733" }}>
              Type
            </Typography>
            <Box>
              <FormControlLabel
                control={<Checkbox checked={subCategory.includes("topwear")} name="topwear" onChange={toggleSubCategory} />}
                label="Topwear"
              />
              <FormControlLabel
                control={<Checkbox checked={subCategory.includes("bottomwear")} name="bottomwear" onChange={toggleSubCategory} />}
                label="Bottomwear"
              />
              <FormControlLabel
                control={<Checkbox checked={subCategory.includes("winterwear")} name="winterwear" onChange={toggleSubCategory} />}
                label="Winterwear"
              />
            </Box>
          </Collapse>
        </Grid>

        {/* Product Section */}
        <Grid item xs={12} sm={9}>
          {/* All Collection Heading */}
          <Typography variant="h4" sx={{ fontWeight: "bold", justifyContent: "center" }}>
            All Collection
          </Typography>
          <Divider sx={{ marginY: 2 }} />

          {/* Sort Options */}
          <Box sx={{ marginBottom: "20px", width: "150px" }}>
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              fullWidth
              displayEmpty
            >
              <MenuItem value="relevant">Relevant</MenuItem>
              <MenuItem value="low-high">Price: Low-High</MenuItem>
              <MenuItem value="high-low">Price: High-Low</MenuItem>
            </Select>
          </Box>

          {/* Product Grid */}
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={4} sm={6} md={4} key={product.id}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    padding: "15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                  onClick={() => handleClick(product.id)}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      marginBottom: "10px",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography variant="h6" sx={{ marginBottom: "5px", fontWeight: "bold" }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#FF5733", fontWeight: "bold" }}>
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isLoggedIn}
                    onClick={() => handleAddToCart(product.id)}
                    sx={{ marginTop: "10px" }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Collection;

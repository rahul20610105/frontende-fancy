// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/OrderHistory";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LatestCollection from "./components/LatestCollection";
import ProductItem from "./components/ProductItem";
import Footer from "./components/Footer";
import ShopProvider from "./context/ShopContext";
import SignUp from "./pages/SignUp";
import TeamPage from "./pages/Team";
import Settings from "./pages/Settings";
import ProductTable from "./pages/ProductTable";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "../src/pages/ProtectedRoutes"; // Import ProtectedRoute

const App = () => {
  return (
    <ShopProvider>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/product:Id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/latestCollection" element={<LatestCollection />} />
            <Route path="/product/:id" element={<ProductItem />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/order-history" element={<Orders />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/product-table" element={<ProductTable />} />
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </ShopProvider>
  );
};

export default App;
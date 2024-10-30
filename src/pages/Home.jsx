import React from "react";
import HeroSection from '../components/HeroSection';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";
import { Box } from '@mui/material'; // Importing Box from Material-UI for better styling control

const Home = () => {
  return (
    <Box sx={{ marginTop: "20px" }}> {/* Using Box for layout and styling */}
      <HeroSection />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </Box>
  );
};

export default Home;

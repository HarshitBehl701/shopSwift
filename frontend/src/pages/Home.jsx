import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import Cards from "../components/Cards";
import TwoLayoutSection from "../components/TwoLayoutSection";
import Footer from "../components/Footer";

function Home() {
  

  return (
    <>
      <Navbar currentPage="Home" />
      <HeroSection />
      <CategorySection />
      <Footer />
    </>
  );
}

export default Home;

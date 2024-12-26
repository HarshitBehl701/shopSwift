import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import MultiCardDisplaySection from "../components/MultiCardDisplaySection";

function Home() {
  
  const  ourCollection = [
    {
      imageObj: {
        src: "https://via.placeholder.com/300",
        alt: "Image 1",
      },
      title: "Title 1",
      description: "Description 1",
    },
    {
      imageObj: {
        src: "https://via.placeholder.com/300",
        alt: "Image 2",
      },
      title: "Title 2",
      description: "Description 2",
    },
    {
      imageObj: {
        src: "https://via.placeholder.com/300",
        alt: "Image 3",
      },
      title: "Title 3",
      description: "Description 3",
    },
    {
      imageObj: {
        src: "https://via.placeholder.com/300",
        alt: "Image 4",
      },
      title: "Title 4",
      description: "Description 4",
    },
    {
      imageObj: {
        src: "https://via.placeholder.com/300",
        alt: "Image 5",
      },
      title: "Title 5",
      description: "Description 5",
    },
    {
      imageObj: {
        src: "https://via.placeholder.com/300",
        alt: "Image 6",
      },
      title: "Title 6",
      description: "Description 6",
    },
    {
      imageObj: {
        src: "https://via.placeholder.com/300",
        alt: "Image 7",
      },
      title: "Title 7",
      description: "Description 7",
    },
    {
      imageObj: {
        src: "https://via.placeholder.com/300",
        alt: "Image 8",
      },
      title: "Title 8",
      description: "Description 8",
    },
    {
      imageObj: {
        src: "https://via.placeholder.com/300",
        alt: "Image 9",
      },
      title: "Title 9",
      description: "Description 9",
    },
    {
      imageObj: {
        src: "https://via.placeholder.com/300",
        alt: "Image 10",
      },
      title: "Title 10",
      description: "Description"
    }
  ]

  return (
    <>
      <Navbar currentPage="Home" />
      <HeroSection />
      <CategorySection />
      
      <MultiCardDisplaySection   heading={"Our Top  Collections"} cardsData={ourCollection} />

      <MultiCardDisplaySection   heading={"Top Discounted  Products"} cardsData={ourCollection} />

      <MultiCardDisplaySection   heading={"Women Collection"} cardsData={ourCollection} />

      <MultiCardDisplaySection   heading={"Men  Styles"} cardsData={ourCollection} />

      <MultiCardDisplaySection   heading={"Kids Store"} cardsData={ourCollection} />

      <MultiCardDisplaySection   heading={"New Launches"} cardsData={ourCollection} />

      <Footer />
    </>
  );
}

export default Home;

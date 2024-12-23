import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import Cards from "../components/Cards";
import TwoLayoutSection from "../components/TwoLayoutSection";
import Footer from "../components/Footer";

function Home() {
  const products = [
    {
      imageObj: { alt: "Image 1", src: "https://via.placeholder.com/400" },
      title: "Product 1",
      description:
        "Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1",
    },
    {
      imageObj: { alt: "Image 2", src: "https://via.placeholder.com/400" },
      title: "Product 2",
      description: "Description 2",
    },
    {
      imageObj: { alt: "Image 3", src: "https://via.placeholder.com/400" },
      title: "Product 3",
      description: "Description 3",
    },
    {
      imageObj: { alt: "Image 4", src: "https://via.placeholder.com/400" },
      title: "Product 4",
      description: "Description 4",
    },
  ];

  const topSellers = [
    {
      imageObj: { imageLink: "/assets/loginRegisterBg.jpg", direction: "left" },
      heading: "Heading 1",
      description: "Description 1",
      linkObj: { required: true, redirectPath: "/products", text: "View More" },
    },
    {
      imageObj: {
        imageLink: "/assets/loginRegisterBg.jpg",
        direction: "right",
      },
      heading: "Heading 2",
      description: "Description 2",
      linkObj: { required: true, redirectPath: "/product", text: "View More" },
    },
    {
      imageObj: { imageLink: "/assets/loginRegisterBg.jpg", direction: "left" },
      heading: "Heading 3",
      description: "Description 3",
      linkObj: { required: true, redirectPath: "/products", text: "View More" },
    },
    {
      imageObj: {
        imageLink: "/assets/loginRegisterBg.jpg",
        direction: "right",
      },
      heading: "Heading 4",
      description: "Description 4",
      linkObj: { required: true, redirectPath: "/products", text: "View More" },
    },
  ];

  return (
    <>
      <Navbar currentPage="Home" />
      <HeroSection />
      <CategorySection />

      <h3 className="text-2xl  text-center font-semibold my-12">
        Weekly Top Products
      </h3>
      <div className="productContainer flex  flex-wrap  items-center justify-center mt-12 gap-10 px-8">
        {products.map((product, index) => (
          <Cards
            key={index}
            imageObj={product.imageObj}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>

      <h3 className="text-2xl  text-center font-semibold mt-20  mb-3">
        Weekly Top Sellers
      </h3>
      <div className="topSellersContainer">
        {topSellers.map((topSeller, index) => (
          <TwoLayoutSection
            imageObj={topSeller.imageObj}
            heading={topSeller.heading}
            description={topSeller.description}
            linkObj={topSeller.linkObj}
            key={index}
          />
        ))}
      </div>

      <h3 className="text-2xl  text-center font-semibold mt-20  mb-3">
        Top  Discounted Products
      </h3>
      <div className="topDiscountedProducts flex  flex-wrap  items-center justify-center mt-12 gap-10 px-8">
        {products.map((product, index) => (
          <Cards
            key={index}
            imageObj={product.imageObj}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>

      <h3 className="text-2xl  text-center font-semibold mt-20  mb-3">
        Our Top Collections
      </h3>
      <div className="topDiscountedProducts flex  flex-wrap  items-center justify-center mt-12 gap-10 px-8">
        {products.map((product, index) => (
          <Cards
            key={index}
            imageObj={product.imageObj}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>

      

      <Footer />

    </>
  );
}

export default Home;

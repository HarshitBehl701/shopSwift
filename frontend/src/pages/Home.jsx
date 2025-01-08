import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import MultiCardDisplaySection from "../components/MultiCardDisplaySection";
import Loader from "../components/Loader";
import  {filterAllProducts}  from "../utils/productHelpers";
import  {fetchAllCategories}  from "../utils/categoryHelpers"

function Home() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [categories,setCategories]  = useState([]);

  useEffect(() => {
    async  function  main(){
      //fetching Products for  home  Page
      const productsData = await filterAllProducts();
      setProducts(productsData.reverse());
      if(productsData.length >  0) setLoader(false);

      //fetching Categories  for  Home  Page
      const categoriesData = await fetchAllCategories();
      setCategories(categoriesData)
    }

    main();
  }, []);

  return (
    <>
      <Navbar currentPage="Home" />
      <HeroSection />
      <CategorySection categories={categories} />

      <div
        className={
          loader
            ? "productContainer w-full  min-h-36  py-28 relative mt-12"
            : "productContainer w-full  min-h-36 relative mt-12"
        }
      >
        {loader ? (
          <Loader />
        ) : (
          <MultiCardDisplaySection
            heading={"Our Top  Collections"}
            cardsData={products}
          />
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;

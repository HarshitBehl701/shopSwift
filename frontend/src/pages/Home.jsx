import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import MultiCardDisplaySection from "../components/MultiCardDisplaySection";
import { getProducts } from "../api/product";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import Loader from "../components/Loader";
import  {categories}  from "../api/category";

function Home() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [categoriesData,setCategoriesData]  = useState([]);

  let productsFetched = false;
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data.data);
        setLoader(false);
      } catch (err) {
        handleError(err.message);
      }
    }

    if (!productsFetched) {
      fetchProducts();
      productsFetched = true;
    }
  }, []);

  useEffect(()   =>  {
    const fetchCategories  = async () => {
      try{
        const response = await categories();

        if(!response.status){
          handleError('Some  Error   Occured')
        }else{
          setCategoriesData(response.data);
        }
      }catch(error){
        handleError("Categories Not   Found");
      }
    }

    fetchCategories();

  },[]);

  return (
    <>
      <Navbar currentPage="Home" />
      <HeroSection />
      <CategorySection categories={categoriesData} />

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
      <ToastContainer />
    </>
  );
}

export default Home;

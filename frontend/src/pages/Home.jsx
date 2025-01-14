import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import MultiCardDisplaySection from "../components/MultiCardDisplaySection";
import Loader from "../components/Loader";
import  {fetchAllCategories}  from "../utils/categoryHelpers"
import  {mainPageHelper} from  "../utils/pageDataInsertHelpers";


function Home() {
  const [pageData, setPageData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [categories,setCategories]  = useState([]);

  useEffect(() => {
    async  function  main(){
      //fetching Products for  home  Page
      const responsePageData = await mainPageHelper();
      setPageData(responsePageData);
      //fetching Categories  for  Home  Page
      const categoriesData = await fetchAllCategories();
      setCategories(categoriesData)
    }

    main();
  }, []);

  useEffect(()  => {
    if(pageData.length >  0) setLoader(false);
  },[pageData])

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
        {loader && <Loader />}
        {!loader &&  pageData.map((val,index)  => {
          return  <MultiCardDisplaySection
          key={index}
          heading={val.heading}
          cardsData={val.data}
        />  
        }
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;

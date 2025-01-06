import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchComponent from "../components/SearchComponent";
import Cards from "../components/Cards";
import DropDownOption from "../components/DropDownOption";
import { Link, useLocation, useParams } from "react-router-dom";
import { filterAllProducts } from "../utils/productHelpers";
import { fetchAllCategories } from "../utils/categoryHelpers";

function Products() {
  const [products, setProducts] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const {queryParameter1,queryParameter2} = useParams();
  const location = useLocation();

  const discounts = [25, 30, 45, 50, 70, 80];
  
  useEffect(() => {

    const main = async ()  => {
  
      //fetching products for products page
      const productsData = await filterAllProducts(queryParameter1,queryParameter2);
      setProducts(productsData);

      //fetching categories for products page
      const categoriesData = await  fetchAllCategories();
      setCategoriesData(categoriesData);
    } 

    main();
  }, [location]);

  return (
    <>
      <Navbar currentPage="Products" />
      <br />
      <br />
      <div className="twoSectionLayout  flex  md:flex-row  flex-col justify-center gap-3">
        <div className="leftSection px-8 md:w-[30%] md:pt-8 md:pb-8  md:border w-full  rounded-lg md:shadow-md md:block flex items-center justify-center  flex-wrap  gap-3">
          <h1 className="text-center font-semibold text-xl">
            Explore Our Collections
          </h1>
          <SearchComponent size={"md:w-full w-96  md:mt-4"} />
          <hr className="mt-4 mb-8  border-zinc-400" />
          <div className="categoriesSection md:block  hidden border py-4  mt-8  rounded-lg shadow-md px-3">
            <h2 className="font-semibold text-xl text-center mb-6">
              Shop By Category
            </h2>
            {categoriesData.map((category, index) => (
              <DropDownOption
                key={index}
                mainData={category}
                subData={category.subCategory}
              />
            ))}
          </div>

          <div className="filterByDiscount  md:block  hidden border py-4  mt-12  rounded-lg shadow-md">
            <h2 className="font-semibold text-xl text-center mb-4">
              Filter By Discount
            </h2>
            {discounts.map((discount, index) => (
              <Link
                key={index}
                to={`/products/discount/${discount}`}
                className="border  inline-block rounded-full text-zinc-600   hover:bg-blue-600   hover:text-white hover:border-white text-sm font-semibold px-3 m-2 py-1"
              >
                Flat {discount}% Off
              </Link>
            ))}
          </div>
        </div>

        <div className="rightSection productsContainer md:border py-8 px-4 grid rounded-lg md:shadow-md gap-6 md:w-[65%] w-full grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Cards
              key={index}
              imageSrcs={product.image}
              imageAlt={product.name + index}
              title={product.name}
              description={product.description}
              link={`/product/${product.productId}`}
            />
            ))}
            {Array.isArray(products) && products?.length == 0  &&  <p className="italic">No Products Found...</p>} 
        </div>

      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Products;
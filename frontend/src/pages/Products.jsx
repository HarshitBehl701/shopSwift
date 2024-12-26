import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchComponent from "../components/SearchComponent";
import Cards from "../components/Cards";
import DropDownOption from "../components/DropDownOption";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

function Products() {
  const products = [
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
    {
      imageObj: {
        src: "https://placehold.co/200x200/png",
        alt: "Alternate Text",
      },
      title: "Title",
      description: "Description",
    },
  ];

  const categories = [
    {
      heading: "Clothing",
      options: ["Men's Fashion", "Women's Fashion", "Babies' Fashion", "Activewear", "Accessories"],
    },
    {
      heading: "Electronics",
      options: ["Mobile Phones", "Laptops", "Tablets", "Gaming Consoles", "Headphones"],
    },
    {
      heading: "Home & Living",
      options: ["Furniture", "Kitchenware", "Decor", "Bedding", "Gardening Tools"],
    },
    {
      heading: "Beauty & Personal Care",
      options: ["Makeup", "Skincare", "Hair Care", "Fragrances", "Men's Grooming"],
    },
    {
      heading: "Sports & Outdoors",
      options: ["Fitness Equipment", "Outdoor Gear", "Cycling", "Running", "Camping"],
    },
    {
      heading: "Books & Stationery",
      options: ["Fiction", "Non-Fiction", "Textbooks", "Office Supplies", "Art Supplies"],
    },
    {
      heading: "Toys & Baby Products",
      options: ["Baby Care", "Educational Toys", "Board Games", "Outdoor Play", "Dolls & Action Figures"],
    },
    {
      heading: "Automotive",
      options: ["Car Accessories", "Motorbike Accessories", "Car Electronics", "Tires", "Vehicle Maintenance"],
    },
    {
      heading: "Groceries",
      options: ["Fruits & Vegetables", "Snacks & Beverages", "Spices & Condiments", "Packaged Food", "Household Essentials"],
    },
    {
      heading: "Health & Wellness",
      options: ["Supplements", "Medical Equipment", "First Aid", "Personal Hygiene", "Fitness Accessories"],
    }
  ];

  const discounts = ['25','30','45','50','70','80'];
  
  const  otherCategories =  [
    {
      name: 'Newly  Added Products',
      link:   '/'
    },
    {
      name:  'Top  Trendies',
      link: '/'
    },
    {
      name:  'Best  Decorations',
      link: '/'
    }

  ]
  

  return (
    <>
      <Navbar currentPage="Products" />
      <br />
      <div className="twoSectionLayout  flex  md:flex-row  flex-col justify-center gap-3">
        <div className="leftSection px-8 md:w-1/4 md:pt-8  md:border w-full  rounded-lg md:shadow-md md:block flex items-center justify-center  flex-wrap  gap-3">
          <h1 className="text-center font-semibold text-xl">
            Explore Our Collections
          </h1>
          <SearchComponent size={"md:w-64 w-96  md:mt-4"} />
          <hr className="mt-4 mb-8  border-zinc-400" />
          <div className="categoriesSection md:block  hidden border py-4  mt-8  rounded-lg shadow-md px-3">
          <h2 className="font-semibold text-xl text-center mb-6">Shop   By   Category</h2>
          {categories.map((category,index) => <DropDownOption key={index} heading={category.heading} options={category.options} />)}
            </div>      

            <div className="filterByDiscount  md:block  hidden border py-4  mt-12  rounded-lg shadow-md">
            <h2 className="font-semibold text-xl text-center mb-4">Filter By Discount</h2>
            {discounts.map((discount,index) =><button  key={index} className="border rounded-full text-zinc-600   hover:bg-blue-600   hover:text-white hover:border-white text-sm font-semibold px-3 m-2 py-1">Flat {discount}% Off</button>)}
            </div>
        <br /><br />
          {otherCategories.map((category,index)  =>  <Link key={index} to={category.link}  className="text-sm   md:block  hidden font-semibold hover:text-blue-600 my-2">{category.name} <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link>)}
        </div>

        <div className="rightSection productsContainer  md:border py-8  flex items-center rounded-lg  md:shadow-md justify-center gap-3 md:w-[73%] w-full flex-wrap">
          {products.map((product, index) => (
            <Cards
              key={index}
              imageObj={product.imageObj}
              title={product.title}
              description={product.description}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Products;

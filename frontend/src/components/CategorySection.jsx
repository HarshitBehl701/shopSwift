import React from "react";
import { Link } from "react-router-dom";

function CategorySection() {
  const categoriesSection = [
    {
      image: "/electronics.jpg",
      name: "Electronics",
      link: "/products/electronics",
    },
    {
      image: "/clothing.jpg",
      name: "Clothing",
      link: "/products/clothing",
    },
    {
      image: "/shoes.jpg",
      name: "Shoes",
      link: "/products/shoes",
    },
    {
      image: "/accessories.jpg",
      name: "Accessories",
      link: "/products/accessories",
    },
    {
      image: "/baby.jpg",
      name: "Baby",
      link: "/products/baby",
    },
    {
      image: "/furniture.jpg",
      name: "Furniture",
      link: "/products/furniture",
    },
    {
      image: "/decor.jpg",
      name:  "Home Decor",
      link: "/products/home-decor",
    }
  ];

  return (
    <div className="categorySection w-[95%] mx-auto">
      <h1 className="md:text-2xl  text-xl text-center font-semibold">Shop By Category</h1>
      <div className="categorySlider mt-8 flex items-center justify-center md:gap-14 gap-6 flex-wrap">
        {categoriesSection.map((category, index) => (
          <Link to={category.link} key={index}   className="flex flex-col items-center justify-center">
            <div className="border md:w-24 md:h-24   w-20  h-20  rounded-full shadow-lg mb-1 overflow-hidden">
              <img
                src={`/assets/${category.image}`}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p  className="font-semibold text-sm">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;

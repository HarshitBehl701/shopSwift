import React from "react";
import { Link } from "react-router-dom";

function CategorySection({categories}) {
  return (
    <div className="categorySection w-[95%] mx-auto">
      <h1 className="md:text-2xl  text-xl text-center font-semibold">Shop By Category</h1>
      <div className="categorySlider mt-8 flex items-center justify-center md:gap-14 gap-6 flex-wrap">
        { Array.isArray(categories) && categories.map((category, index) => (
          <Link to={`/products/${category.name}`} key={index}   className="flex flex-col items-center justify-center">
            <div className="border md:w-24 md:h-24   w-20  h-20  rounded-full shadow-lg mb-1 overflow-hidden">
              <img
                src={`/uploads/other/${category.image}`}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p  className="font-semibold text-sm">{category.name.charAt(0).toUpperCase() +  category.name.slice(1)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;

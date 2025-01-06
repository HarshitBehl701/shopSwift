import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils/toastContainerHelperfn";
import { getSellerProducts } from "../api/product";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ExpandableDescription from "../components/ExpandableDescription";

function ProductList({ title, type }) {
  const [products, setProduct] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getSellerProducts(
          localStorage.getItem("token"),
          localStorage.getItem("userType"),
          type
        );
        setProduct(response.data);
      } catch (error) {
        handleError(error.message);
        setProduct([]);
      }
    };
    fetchProducts();
  }, [location]);

  return (
    <>
      <h3 className="font-semibold mb-2">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </h3>
      <hr className="border-gray-300 mb-4" />

      {/* Products List */}
      <ul className="max-h-[500px] overflow-y-auto space-y-4">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product, index) => (
            <Link to={`/seller/product/${product.productId}`} key={index}>
              <li className="border-b border-gray-200 pb-4">
                <div className="twoSection flex flex-col md:flex-row md:gap-4 gap-6">
                  {/* Left Side (Carousel) */}
                  <div className="leftSide w-[120px] h-[120px] md:flex-none flex justify-center items-center cursor-pointer">
                    <Carousel
                      pauseOnHover
                      indicators={false}
                      controls={false}
                      leftControl=" "
                      rightControl=" "
                      className="w-[120px] h-[120px] rounded-md shadow-md"
                    >
                      {product.image.map((image, imageIndex) => (
                        <img
                          key={imageIndex}
                          src={`/uploads/other/${image}`}
                          alt={`product-${imageIndex}`}
                          className="w-full h-full rounded-md object-cover object-top"
                        />
                      ))}
                    </Carousel>
                  </div>

                  {/* Right Side (Product Details) */}
                  <div className="rightSide flex-1">
                    <ul className="space-y-2">
                      <li className="flex gap-2 items-center text-sm">
                        <span className="inline-block md:w-[25%] w-[35%] font-medium">
                          Name
                        </span>
                        <span className="text-gray-500">:</span>
                        <span className="text-gray-800">{product.name}</span>
                      </li>
                      <li className="flex gap-2 items-center text-sm">
                        <span className="inline-block md:w-[25%] w-[35%] font-medium">
                          Price
                        </span>
                        <span className="text-gray-500">:</span>
                        <span className="text-green-600">₹{product.price}</span>
                      </li>
                      <li className="flex gap-2 items-start text-sm">
                        <span className="inline-block md:w-[25%] w-[35%] font-medium">
                          Description
                        </span>
                        <span className="text-gray-500">:</span>
                        <ExpandableDescription
                          description={product.description}
                          limit={30}
                        />
                      </li>
                      <li className="flex gap-2 items-center text-sm">
                        <span className="inline-block md:w-[25%] w-[35%] font-medium">
                          Status
                        </span>
                        <span className="text-gray-500">:</span>
                        <span
                          className={`${
                            product.status === "Active"
                              ? "text-blue-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.status}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </Link>
          ))
        ) : (
          <p className="italic text-sm text-gray-500 text-center">
            No Products Yet
          </p>
        )}
      </ul>

      <ToastContainer />
    </>
  );
}

export default ProductList;

import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";
import { getSellerProducts } from "../api/product";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ExpandableDescription  from "../components/ExpandableDescription";

function ProductList({ title  ,type }) {
  const [products, setProduct] = useState([]);
  const  location  = useLocation();

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
      <h3 className="font-semibold">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </h3>
      <hr className="my-2  border border-zinc-200" />
      <ul className="max-h-[500px] overflow-y-auto">
        {(Array.isArray(products) &&  products.length > 0) &&  products.map((product, index) => (
          <Link to={`/seller/product/${product.productId}`} key={index}>
            <li className="border-b-2 border-zinc-100  py-2">
              <div className="twoSection flex  md:gap-3  gap-4 md:flex-row flex-col ">
                <div className="leftSide w-[120px]  h-[120px] cursor-pointer">
                  <Carousel
                    pauseOnHover
                    indicators={false}
                    controls={false}
                    leftControl=" "
                    rightControl=" "
                  >
                    {product.image.map((image, imageIndex) => (
                      <img
                        key={imageIndex}
                        src={`/uploads/other/${image}`}
                        alt="image"
                        className="w-[100px] h-[100px] rounded-md object-cover object-top shadow-sm"
                      />
                    ))}
                  </Carousel>
                </div>
                <div className="rightSide  w-full">
                  <ul>
                    <li className="flex gap-2 w-full  text-sm my-1  items-center">
                      <span className="inline-block md:w-[20%] w-[30%] font-semibold">
                        Name
                      </span>
                      <span>:</span>
                      <span>{product.name}</span>
                    </li>
                    <li className="flex gap-2  w-full  text-sm my-1  items-center">
                      <span className="inline-block md:w-[20%] w-[30%] font-semibold">
                        Price
                      </span>
                      <span>:</span>
                      <span>{product.price}</span>
                    </li>
                    <li className="flex gap-2  w-full  text-sm my-1  items-center">
                      <span className="inline-block md:w-[20%] w-[30%]  font-semibold">
                        Description
                      </span>
                      <span>:</span>
                      <ExpandableDescription description={product.description} limit={30} />
                    </li>
                    <li className="flex gap-2  w-full  text-sm my-1  items-center">
                      <span className="inline-block md:w-[20%] w-[30%]  font-semibold">
                        Status
                      </span>
                      <span>:</span>
                      <span>{product.status}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </Link>
        ))}
        {(Array.isArray(products) &&  products.length == 0)   &&  <p className="italic text-xs">No Products  Yet</p>}
      </ul>
      <ToastContainer />
    </>
  );
}

export default ProductList;

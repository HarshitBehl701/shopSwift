import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { getProducts, getProductDetail } from "../api/product";
import { Carousel } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Product() {
  const { productId } = useParams();

  const [product, setProduct] = useState({
    name: "",
    image: ["https://placehold.co/400"],
    brandName: "",
    brandLogo: "",
    category: "",
    price: "",
    discount: "",
    platformFee: "",
    description: "",
    views: "",
    rating: "",
  });

  const [products, setProducts] = useState([]);

  let is_product_fetch = false;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductDetail(productId);
        if (response.status) {
          setProduct(response.data);
        } else {
          handleError("Some Unexpected  error occured");
        }
      } catch (error) {
        handleError(error.message);
      }
    };

    if (!is_product_fetch) {
      fetchProduct();
      is_product_fetch = true;
    }
  }, []);

  let is_products_fetch = false;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response.status) {
          setProducts(response.data);
        } else {
          handleError("Some Unexpected  error occured");
        }
      } catch (error) {
        handleError(error.message);
      }
    };

    if (!is_products_fetch) {
      fetchProducts();
      is_products_fetch = true;
    }
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <>
      <Navbar currentPage="Products" />
      <div className="productionInfo my-12  px-8">
        <div className="twoSectionLayout flex   justify-center gap-5 md:flex-nowrap flex-wrap  h-fit py-3">
          <div className="leftSection md:w-1/2  h-[200px]   rounded-md overflow-hidden shadow-sm w-full">
            <Carousel pauseOnHover>
              {product.image.map((item, index) => (
                <img
                  key={index}
                  src={`/uploads/other/${item}`}
                  alt={item + index}
                  className="object-cover border rounded-lg shadow-sm"
                />
              ))}
            </Carousel>
          </div>
          <div className="rightSection w-full  md:py-0  py-4">
            <div className="headerContainer   flex items-center  justify-between   w-1/2  mb-3">
              <h1 className="text-xl font-semibold">{product.name}</h1>
              <Link title="Whislist">
                {" "}
                <FontAwesomeIcon icon={faHeart} className="text-xl" />
              </Link>
            </div>
            <ul className="w-1/2">
              <li className="flex items-center  justify-between">
                <span>Brand</span>
                <span>{product.brandName}</span>
              </li>
              <li className="flex items-center  justify-between">
                <span>Price</span>
                <span>
                  <span>{product.price - product.discount}</span>{" "}
                  <span className="line-through text-zinc-500">
                    ({product.price})
                  </span>
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Rating</span>
                <span>
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={
                        index < product.rating
                          ? "text-[#ffc107]"
                          : "text-[#e4e5e9]"
                      }
                    >
                      ★
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Description</span>
                <span>
                  {isExpanded  || !(product.description.length > 100)
                    ? product.description
                    : `${product.description.slice(0, 100)}...`}
                  {  (product.description.length > 100) && 
                    <button
                    onClick={toggleDescription}
                    className="ml-2 text-blue-500 text-xs hover:underline"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                  }
                </span>
              </li>
            </ul>
            <Link to={'/user/add-to-cart'} className="bg-blue-600 text-white  hover:bg-blue-700 text-xs px-2 py-1   rounded-md  shadow-sm mt-4  inline-block">
              Add To Cart
            </Link>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mx-8  mt-12">
        View Similar Products
      </h2>
      <div className="productsContainer  py-8  flex items-center rounded-lg  justify-center gap-3 w-full flex-wrap">
        {products.map((product, index) => {
          if (product._id !== productId) {
            return (
              <Cards
                key={index}
                imageSrcs={product.image}
                imageAlt={index}
                title={product.title}
                description={product.description}
              />
            );
          }
        })}
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Product;

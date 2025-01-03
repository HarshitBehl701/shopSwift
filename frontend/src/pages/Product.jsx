import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import {
  getProducts,
  getProductDetail,
  updateProductView,
} from "../api/product";
import { Carousel } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { manageCart, updateUserWhislist } from "../api/user";
import ExpandableDescription from "../components/ExpandableDescription";
import { getUserCartWhislist } from "../api/user";

function Product() {
  const location = useLocation();

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
    rating: 0,
    customer_rate: 0,
  });

  const [products, setProducts] = useState([]);
  const [userCartWhislistData, setUserCartWhislistData] = useState({});
  const [isCurrentProductAlreadyInCart, setIsCurrentProductAlreadyInCart] =
    useState(false);
  const [
    isCurrentProductAlreadyInWhisList,
    setIsCurrentProductAlreadyInWhislist,
  ] = useState(false);

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

    fetchProduct();
  }, [location]);

  useEffect(() => {
    const fetchUserCartWhislist = async () => {
      try {
        const response = await getUserCartWhislist(
          localStorage.getItem("token"),
          localStorage.getItem("userType")
        );
        if (response.status) setUserCartWhislistData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserCartWhislist();
  }, [product]);

  useEffect(() => {
    setIsCurrentProductAlreadyInCart(false);
    userCartWhislistData.cart?.forEach((item) => {
      if (item._id == productId) {
        setIsCurrentProductAlreadyInCart(true);
      }
    });
  }, [product]);

  useEffect(() => {
    setIsCurrentProductAlreadyInWhislist(false);
    userCartWhislistData.whislist?.forEach((item) => {
      if (item._id == productId) {
        setIsCurrentProductAlreadyInWhislist(true);
      }
    });
  }, [product]);

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

    fetchProducts();
  }, [location]);

  useEffect(() => {
    const updateProductViewfn = async () => {
      try {
        const response = await updateProductView({
          productId: productId,
          action: "add_view",
        });
      } catch (error) {
        // console.error('Some Unexpected   Error  Occured')
      }
    };

    updateProductViewfn();
  }, [product]);

  const handleManageCart = async () => {
    if (
      !localStorage.getItem("token") ||
      (!localStorage.getItem("userType") &&
        localStorage.getItem("userType") !== "user")
    ) {
      handleError("Please Do  Login First");
    } else {
      try {
        const response = await manageCart(
          localStorage.getItem("token"),
          localStorage.getItem("userType"),
          {
            productId: product.productId,
            type: isCurrentProductAlreadyInCart ? "remove" : "add",
          }
        );
        if (!response.status) {
          handleError("Some Unexpected   Error   Occured");
        } else {
          setIsCurrentProductAlreadyInCart((prevStatus) =>
            prevStatus ? "not_added" : "added"
          );
          handleSuccess(
            `Successfully  ${
              isCurrentProductAlreadyInCart
                ? "removed  item  from the"
                : "item  added to"
            } cart`
          );
          setTimeout(() => window.location.reload(), 2000);
        }
      } catch (error) {
        console.log("hi");
        handleError(error.message);
      }
    }
  };

  const handleManageWhislist = async () => {
    if (
      !localStorage.getItem("token") ||
      (!localStorage.getItem("userType") &&
        localStorage.getItem("userType") !== "user")
    ) {
      handleError("Please Do  Login First");
    } else {
      try {
        const response = await updateUserWhislist(
          localStorage.getItem("token"),
          localStorage.getItem("userType"),
          {
            productId: productId,
            type:
              isCurrentProductAlreadyInWhisList === false ? "add" : "remove",
          }
        );

        if (!response.status) {
          handleError("Some Unexpected   Error   Occured");
        } else {
          setIsCurrentProductAlreadyInWhislist((prevStatus) =>
            prevStatus === "not_added" ? "added" : "not_added"
          );
          handleSuccess(
            `Successfully  ${
              isCurrentProductAlreadyInWhisList === false
                ? "item  added to"
                : "removed  item  from the"
            } whislist`
          );
          setTimeout(() => window.location.reload(), 2000);
        }
      } catch (error) {
        handleError(error.message);
      }
    }
  };

  return (
    <>
      <Navbar currentPage="Products" />

      <div className="productionInfo my-12 px-8">
        <h1 className="mb-3 text-xl font-semibold text-gray-800">
          Product Details
        </h1>
        <div className="twoSectionLayout flex justify-center gap-10 md:flex-nowrap flex-wrap h-fit py-6">
          {/* Left Section: Carousel */}
          <div className="leftSection md:w-[30%] h-[350px] rounded-lg overflow-hidden shadow-xl w-full bg-white">
            <Carousel pauseOnHover>
              {product.image.map((item, index) => (
                <img
                  key={index}
                  src={`/uploads/other/${item}`}
                  alt={item + index}
                  className="w-full h-full object-contain object-top transition-transform duration-500 ease-in-out transform hover:scale-110"
                />
              ))}
            </Carousel>
          </div>

          {/* Right Section: Product Info */}
          <div className="rightSection w-full md:w-[50%] md:py-0 py-6">
            <div className="headerContainer flex items-center justify-between mb-6">
              <h1 className="font-semibold text-xl text-gray-900">
                {product.name}
              </h1>
              <button onClick={handleManageWhislist}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={
                    isCurrentProductAlreadyInWhisList
                      ? "text-red-600 text-2xl"
                      : "text-gray-500 text-2xl"
                  }
                />
              </button>
            </div>

            <ul className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Brand */}
              <li className="flex items-center justify-between py-4 px-6 border-b border-gray-200 hover:bg-gray-50 transition-all duration-200">
                <span className="text-gray-600 font-medium text-sm">Brand</span>
                <span className="text-gray-800 text-sm">
                  {product.brandName}
                </span>
              </li>

              {/* Price */}
              <li className="flex items-center justify-between py-4 px-6 border-b border-gray-200 hover:bg-gray-50 transition-all duration-200">
                <span className="text-gray-600 font-medium text-sm">Price</span>
                <span className="text-gray-800 text-sm">
                  <span className="text-lg font-semibold">
                    ₹{product.price - product.discount}
                  </span>
                  <span className="line-through text-zinc-500 text-xs ml-2">
                    (₹{product.price})
                  </span>
                </span>
              </li>

              {/* Rating */}
              <li className="flex items-center justify-between py-4 px-6 border-b border-gray-200 hover:bg-gray-50 transition-all duration-200">
                <span className="text-gray-600 font-medium text-sm">
                  Rating
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={
                        index < product.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-400">
                    ({product.customer_rate})
                  </span>
                </div>
              </li>

              {/* Description */}
              <li className="flex items-center justify-between py-4 px-6 border-b border-gray-200 hover:bg-gray-50 transition-all duration-200">
                <span className="text-gray-600 font-medium text-sm">
                  Description
                </span>
                <div className="max-w-[80%]">
                  <ExpandableDescription
                    description={product.description}
                    limit={40}
                  />
                </div>
              </li>
            </ul>

            {/* Cart Button */}
            <button
              className={`w-full text-sm px-6 py-3 rounded-xl shadow-lg mt-6 font-semibold transition-all duration-300 ease-in-out ${
                isCurrentProductAlreadyInCart
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              onClick={handleManageCart}
            >
              {isCurrentProductAlreadyInCart
                ? "Remove From Cart"
                : "Add To Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <h2 className="text-2xl font-semibold mx-8 mt-12 text-gray-800">
        View Similar Products
      </h2>
      <div className="productsContainer py-8 flex items-center justify-center gap-4 w-full flex-wrap">
        {products.map((product, index) => {
          if (product._id !== productId) {
            return (
              <Cards
                key={index}
                imageSrcs={product.image}
                imageAlt={index}
                title={product.name}
                description={product.description}
                link={`/product/${product.productId}`}
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

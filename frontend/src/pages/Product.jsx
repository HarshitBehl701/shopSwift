import React, { useState, useEffect } from "react";
import { useParams, Link ,useLocation} from "react-router-dom";
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
import { manageCart } from "../api/manageUser";
import ExpandableDescription from "../components/ExpandableDescription";

function Product() {
  const  location =  useLocation();

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

  const [currentCartStatus, setCurrentCartStatus] = useState("not_added");

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

  useEffect(() =>{
    const updateProductView = async () => {
      try{
        const response  =  await updateProductView({productId: productId,action:  'add_view'});
      }catch(error){
        console.log(error);
        // console.error('Some Unexpected   Error  Occured')
      }
    }

    updateProductView();
  },[location]);

  const handleManageCart = async () => {
    try {
      const response = await manageCart(
        localStorage.getItem("token"),
        localStorage.getItem("userType"),
        {
          productId: product._id,
          type: currentCartStatus === "not_added" ? "add" : "remove",
        }
      );

      if (!response.status) {
        handleError("Some Unexpected   Error   Occured");
      } else {
        setCurrentCartStatus(
          currentCartStatus === "not_added" ? "added" : "not_added"
        );
        handleSuccess(
          `Successfully  ${
            currentCartStatus === "not_added"
              ? "item  added to"
              : "removed  item  from the"
          } cart`
        );
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const [currentWhislistStatus, setCurrentWhislistStatus] =
    useState("not_added");

  const handleManageWhislist = async () => {
    try {
      const response = await manageCart(
        localStorage.getItem("token"),
        localStorage.getItem("userType"),
        {
          productId: product._id,
          type: currentCartStatus === "not_added" ? "add" : "remove",
        }
      );

      if (!response.status) {
        handleError("Some Unexpected   Error   Occured");
      } else {
        setCurrentWhislistStatus(
          currentWhislistStatus === "not_added" ? "added" : "not_added"
        );
        handleSuccess(
          `Successfully  ${
            currentWhislistStatus === "not_added"
              ? "item  added to"
              : "removed  item  from the"
          } whislist`
        );
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <>
      <Navbar currentPage="Products" />
      <div className="productionInfo my-12  px-8">
        <h1 className="mb-3  text-xl  font-semibold">Product Details</h1>
        <div className="twoSectionLayout flex   justify-center gap-5 md:flex-nowrap flex-wrap  h-fit py-3">
          <div className="leftSection md:w-1/3 border h-[200px] rounded-md overflow-hidden shadow-sm w-full">
            <Carousel pauseOnHover>
              {product.image.map((item, index) => (
                <img
                  key={index}
                  src={`/uploads/other/${item}`}
                  alt={item + index}
                  className="w-full h-full object-cover object-top"
                />
              ))}
            </Carousel>
          </div>
          <div className="rightSection w-full  md:py-0  py-4">
            <div className="headerContainer   flex items-center  justify-between   w-1/2  mb-3">
              <h1 className="font-semibold w-[80%]">{product.name}</h1>
              <Link title="Whislist" onClick={handleManageWhislist}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={
                    currentWhislistStatus == "not_added"
                      ? "text-xl"
                      : " text-red-600  text-xl"
                  }
                />
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
                  <span className="text-sm  text-zinc-400">
                    ({product.customer_rate})
                  </span>
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Description</span>
                <div  className="max-w-[80%]">
                <ExpandableDescription
                  description={product.description}
                  limit={40}
                />
                </div>
              </li>
            </ul>
            <button
              className="bg-blue-600 text-white  hover:bg-blue-700 text-xs px-2 py-1   rounded-md  shadow-sm mt-4 "
              onClick={handleManageCart}
            >
              Add To Cart
            </button>
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

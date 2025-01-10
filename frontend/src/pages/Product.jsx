import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import { handleError, handleSuccess } from "../utils/toastContainerHelperfn";
import { ToastContainer } from "react-toastify";
import { Carousel } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ExpandableDescription from "../components/ExpandableDescription";
import { fetchAllProducts,fetchProduct,updateProductViewsFn } from "../utils/productHelpers";
import  {fetchUserCartWhislistData,handleUserCartOrWhislist}  from "../utils/manageUserProfileHelper";
import Comments from "../components/Comments";
import { getLocalStorageVariables } from "../utils/commonHelper";

function Product() {
  const location = useLocation();
  const { productId } = useParams();
  const [userType] =  getLocalStorageVariables('userType');

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
  const [isCurrentProductAlreadyInCart, setIsCurrentProductAlreadyInCart] = useState(false);
  const [isCurrentProductAlreadyInWhisList,setIsCurrentProductAlreadyInWhislist] = useState(false);
  const [commentData,setCommentData] = useState([]);

  useEffect(() => {

    const  main = async  () => {
      
      //fetching product data
      const productData = await fetchProduct(productId);
      setProduct(productData);
      setCommentData(productData.comments);
      //fetching products data
      const productsData = await fetchAllProducts();
      setProducts(productsData);

    }

    main();

  }, [location]);

  useEffect(() => {
    const main = async ()  =>{

      //fetching  user  Cart and whislist data
      const userCartWhislistsData = await fetchUserCartWhislistData();
      setUserCartWhislistData(userCartWhislistsData.data);

      //checks if the current product is already  in the  cart or  not
      setIsCurrentProductAlreadyInCart(false);
      userCartWhislistData?.cart?.forEach((item) => {
        if (item._id == productId) {
          setIsCurrentProductAlreadyInCart(true);
        }
      });

      //checks  if the current product is already in the  whislist or not
      setIsCurrentProductAlreadyInWhislist(false);
      userCartWhislistData?.whislist?.forEach((item) => {
        if (item._id == productId) {
          setIsCurrentProductAlreadyInWhislist(true);
        }
      });

      updateProductViewsFn(productId); //update product  view
      
    }

    main();

  }, [product]);

  const handleManageCart   = async ()   => {
    const response  =  await handleUserCartOrWhislist('cart',isCurrentProductAlreadyInCart,setIsCurrentProductAlreadyInCart,productId);

    if(!response?.status)
      handleError(response?.message);
    else{
      handleSuccess('Successfully Updated  Your Cart');
      setTimeout(() => window.location.reload(), 2000);
    }
    
  }


  const handleManageWhislist =  async  ()  =>{
    const response  =  await  handleUserCartOrWhislist('whislist',isCurrentProductAlreadyInWhisList,setIsCurrentProductAlreadyInWhislist,productId);

    if(!response?.status)
      handleError(response?.message);
    else{
      handleSuccess('Successfully Updated  Your Whislist');
      setTimeout(() => window.location.reload(), 2000);
    }
  }

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
              {userType  == 'user'  &&  <button onClick={handleManageWhislist}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={
                    isCurrentProductAlreadyInWhisList
                      ? "text-red-600 text-2xl"
                      : "text-gray-500 text-2xl"
                  }
                />
              </button>}
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
            {userType   == 'user'  &&  <button
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
            </button>}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <Comments data={commentData} />

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

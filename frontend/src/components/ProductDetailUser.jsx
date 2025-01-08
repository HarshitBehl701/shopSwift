import React, { useState, useEffect } from "react";
import { Carousel } from "flowbite-react";
import { useLocation ,useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/toastContainerHelperfn";
import { ToastContainer } from "react-toastify";
import  ExpandableDescription  from "../components/ExpandableDescription";
import  {fetchProduct} from "../utils/productHelpers"
import  {fetchUserCartWhislistData} from "../utils/manageUserProfileHelper"
import  {manageUserPlacingOrderOrAddingToCart} from "../utils/manageUserProfileHelper"

function ProductDetailUser({ productId }) {
  const location = useLocation();
  const navigate  =  useNavigate();

  const [productData, setProductData] = useState({
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

  const [userCart,setUserCart] = useState([]);

  useEffect(() => {

    const main  = async  ()   => {
      const  productDetail  =  await  fetchProduct(productId);
      setProductData(productDetail)

      const cartOrWhislistData = await fetchUserCartWhislistData();
      const cartItemsId = cartOrWhislistData.data.cart.map((item) => item._id);
      setUserCart(cartItemsId);

    }

    main();
  }, [location]);

  const managePlaceOrderOrAddToCart =  async (action) => {
    const response  = await manageUserPlacingOrderOrAddingToCart(action,productId);
    if(!response.status){
      handleError('Some  Unexpected  Error  Occured');
    }else{
      handleSuccess((action  == 'order')? 'Order  Placed  Successfully' :'Added  To   Cart Successfully');
      setTimeout(() => navigate('/user/orders'),2000);
    }
  }

  return (
    <>
      <h1 className="font-semibold text-gray-800">Product Details</h1>
      <hr className="my-2 border-t border-gray-300" />

      <div className="twoSectionLayout flex flex-col lg:flex-row gap-6 mt-4">
        {/* Left Section: Carousel */}
        <div className="leftSection w-full lg:w-1/3 md:h-[150px] h-[300px] flex items-center justify-center  rounded-md">
          <Carousel
            className="h-full rounded-md"
            pauseOnHover
            indicators={false}
            controls={false}
            leftControl=" "
            rightControl=" "
          >
            {productData.image.map((imgSrc, index) => (
              <img
                key={index}
                src={`/uploads/other/${imgSrc}`}
                alt={`Product ${index}`}
                className="w-full h-full object-cover rounded-md object-top"
              />
            ))}
          </Carousel>
        </div>

        {/* Right Section: Product Details */}
        <div className="rightSection w-full p-4">
          <ul className="space-y-4 text-sm text-gray-700">
            <li className="flex justify-between">
              <span className="font-medium text-gray-600">Name</span>
              <span>{productData.name}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-gray-600">Brand  Name</span>
              <span>{productData.brandName}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-gray-600">Description</span>
              <span  className="w-[70%]">
                <ExpandableDescription description={productData.description} limit={27} />
              </span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-gray-600">Price</span>
              <span>₹{productData.price}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-gray-600">Discount</span>
              <span>-₹{productData.discount}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-gray-600">Platform Fee</span>
              <span
                className={
                  productData.platformFee !== 0 ? "" : "text-green-500"
                }
              >
                {productData.platformFee !== 0
                  ? `-₹${productData.brandLogo.platformFee}`
                  : "Free"}
              </span>
            </li>
            <hr className="my-2 border-t border-gray-200" />
            <li className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Grand Total</span>
              <span>
                ₹
                {productData.price -
                  productData.discount -
                  productData.platformFee}
              </span>
            </li>
          </ul>
          <div className="btnCont flex justify-end">
            <button className="text-xs  px-2 py-1 rounded-md  bg-blue-600  hover:bg-blue-700   text-white  font-semibold mt-4" onClick={ ()  => {
                const action = userCart.includes(productData.productId) ? 'order' : 'cart';
                managePlaceOrderOrAddToCart(action);
            }}>
              {(userCart.includes(productData.productId)  ? 'Buy Now' :   'Add To Cart')}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default ProductDetailUser;

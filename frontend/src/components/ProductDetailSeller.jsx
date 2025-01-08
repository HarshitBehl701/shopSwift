import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError,handleSuccess } from "../utils/toastContainerHelperfn";
import { Carousel } from "flowbite-react";
import ExpandableDescription   from "./ExpandableDescription"
import { Link } from "react-router-dom";
import  {fetchSellerProductDetail} from "../utils/productHelpers"
import { getLocalStorageVariables,handleSellerProductActiveAndInactiveStatus } from "../utils/commonHelper";

function ProductDetail({ productId }) {
  const [product, setProduct] = useState({
    image: ['https://via.placeholder.com/150'],
    name: "",
    category: "",
    sub_category: "",
    description: "",
    price: "",
    discount: "",
    fee: "",
    rating: "",
    number_of_customer_rate: "",
    views: "",
    status: "",
  });

  const currentUser = getLocalStorageVariables('userType');

  useEffect(() => {
    const main =  async  () => {
      const response = await fetchSellerProductDetail(productId);

      if(!response.status) handleError(response.message);
      else setProduct(response.data[0]);
    }

    main();
}, []);


const handleStatusChangeBtn   = async  () => {
  const response = await handleSellerProductActiveAndInactiveStatus(productId,product.status);

  if(!response.status) handleError(response.message);
  else{
    setProduct({...product,status:(product.status?.toLowerCase() == 'active') ? 'Inactive'  : 'Active'});
    handleSuccess('Status Changed Successfully');
  }
}

  return (
    <>
  <div className="header mb-4 flex flex-wrap items-center justify-between">
  <h3 className="font-semibold text-xl text-gray-800">Product Detail</h3>
  {currentUser == 'seller' &&   <Link  to={`/seller/edit_product/${productId}`} className="text-xs border px-2  py-1 rounded-md  shadow-sm bg-blue-600 text-white font-semibold hover:bg-blue-700">Edit Product</Link>}
  </div>
  
  <div className="twoSectionLayout flex flex-col md:flex-row gap-6">
    {/* Left Section: Carousel */}
<div className="leftSection md:w-1/3 w-full md:my-0 my-3 flex flex-col justify-start">
  <Carousel
    className="h-[140px] rounded-md"
    pauseOnHover
    indicators={false}
    controls={false}
    leftControl=" "
    rightControl=" "
  >
    {product.image.map((imgSrc, index) => (
      <img
        key={index}
        src={`/uploads/other/${imgSrc}`}
        alt={`Product ${index}`}
        className="w-full h-[140px] object-cover object-top rounded-md shadow-sm"
      />
    ))}
  </Carousel>
</div>


    {/* Right Section: Product Details */}
    <div className="rightSection w-full p-4">
      <ul className="space-y-4 text-sm text-gray-700">
        <li className="flex items-center gap-3">
          <span className="inline-block min-w-[30%] font-semibold text-gray-600">Name</span>
          <span>:</span>
          <span>{product.name}</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="inline-block min-w-[30%] font-semibold text-gray-600">Category</span>
          <span>:</span>
          <span>{product.category}</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="inline-block min-w-[30%] font-semibold text-gray-600">Description</span>
          <span>:</span>
          <span><ExpandableDescription description={product.description} limit={100} /></span>
        </li>
        <li className="flex items-center gap-3">
          <span className="inline-block min-w-[30%] font-semibold text-gray-600">Price</span>
          <span>:</span>
          <span>₹{product.price}</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="inline-block min-w-[30%] font-semibold text-gray-600">Discount</span>
          <span>:</span>
          <span>₹{product.discount}</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="inline-block min-w-[30%] font-semibold text-gray-600">Platform Fee</span>
          <span>:</span>
          <span>{product.platformFee !== 0 ? `₹${product.platformFee}` : 'Free'}</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="inline-block min-w-[30%] font-semibold text-gray-600">Rating</span>
          <span>:</span>
          <span>{product.rating}</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="inline-block min-w-[30%] font-semibold text-gray-600">Total Customer Rate</span>
          <span>:</span>
          <span>{product.number_of_customer_rate}</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="inline-block min-w-[30%] font-semibold text-gray-600">Views</span>
          <span>:</span>
          <span>{product.views}</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="inline-block min-w-[30%] font-semibold text-gray-600">Status</span>
          <span>:</span>
          <span>
            <button
              onClick={handleStatusChangeBtn}
              className="text-blue-600 hover:text-blue-700 focus:outline-none"
            >
              {product.status}
            </button>
          </span>
        </li>
      </ul>
    </div>
  </div>

  <ToastContainer />
</>

  );
}

export default ProductDetail;

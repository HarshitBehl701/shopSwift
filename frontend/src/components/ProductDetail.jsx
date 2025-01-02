import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError,handleSuccess } from "../utils";
import { getSellerProducts , changeStatusProduct } from "../api/product";
import { Carousel } from "flowbite-react";

function ProductDetail({ productId }) {
  const [product, setProduct] = useState({
    image: ['https://via.placeholder.com/150'],
    name: "",
    category: "",
    description: "",
    price: "",
    discount: "",
    fee: "",
    rating: "",
    views: "",
    status: "",
  });

  let is_productFetched = false;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getSellerProducts(
          localStorage.getItem("token"),
          localStorage.getItem("userType"),
          "product_detail",
          { productId: productId }
        );
        setProduct(response.data[0]);
      } catch (error) {
        handleError(error.message);
      }
    };

    
    if (!is_productFetched) {
        fetchProduct();
        is_productFetched = true;
    }
}, []);


const handleStatusChangeBtn   = async  () => {
    try{
        const response  =  await changeStatusProduct(localStorage.getItem('token'),localStorage.getItem('userType'),{productId:productId,currentStatus:(product.status?.toLowerCase() == 'active') ? 1  : 0});
        if(response.status){
            setProduct({...product,status:(product.status?.toLowerCase() == 'active') ? 'Inactive'  : 'Active'});
            handleSuccess('Status Changed Successfully');
        }else{
            handleError('Some Unexpected Error Occurred');
        }
    }catch(error){
        handleError(error.message);
    }
}

  return (
    <>
      <h3 className="font-semibold">Product Detail</h3>
      <div className="twoSectionLayout  flex md:flex-row  flex-col gap-4">
        <div className="leftSection  md:w-1/3 w-full  md:h-[100px] h-[200px] md:my-0 my-3">
          <Carousel
            className=""
            pauseOnHover
            indicators={false}
            controls={false}
            leftControl=" "
            rightControl=" "
          >
          {product.image.map((imgSrc,index) => <img key={index} src={`/uploads/other/${imgSrc}`} alt={index} className="w-full rounded-md   shadow-sm" />)}
          </Carousel>
        </div>
        <div className="rightSection w-full">
          <ul className="text-sm">
            <li className="flex items-center  gap-2">
              <span className="inline-block min-w-[30%] w-fit  my-1   font-semibold">
                Name
              </span>
              <span>:</span>
              <span className="inline-block px-2">{product.name}</span>
            </li>
            <li className="flex items-center  gap-2">
              <span className="inline-block min-w-[30%] w-fit  my-1   font-semibold">
                Category
              </span>
              <span>:</span>
              <span className="inline-block px-2">{product.category}</span>
            </li>
            <li className="flex items-center  gap-2">
              <span className="inline-block min-w-[30%] w-fit  my-1   font-semibold">
                Description
              </span>
              <span>:</span>
              <span className="inline-block px-2">{product.description}</span>
            </li>
            <li className="flex items-center  gap-2">
              <span className="inline-block min-w-[30%] w-fit  my-1   font-semibold">
                Price
              </span>
              <span>:</span>
              <span className="inline-block px-2">{product.price}</span>
            </li>
            <li className="flex items-center  gap-2">
              <span className="inline-block min-w-[30%] w-fit  my-1   font-semibold">
                Discount
              </span>
              <span>:</span>
              <span className="inline-block px-2">{product.discount}</span>
            </li>
            <li className="flex items-center  gap-2">
              <span className="inline-block min-w-[30%] w-fit  my-1   font-semibold">
                PlatForm Fee
              </span>
              <span>:</span>
              <span className="inline-block px-2">{product.platformFee}</span>
            </li>
            <li className="flex items-center  gap-2">
              <span className="inline-block min-w-[30%] w-fit  my-1   font-semibold">
                Rating
              </span>
              <span>:</span>
              <span className="inline-block px-2">{product.rating}</span>
            </li>
            <li className="flex items-center  gap-2">
              <span className="inline-block min-w-[30%] w-fit  my-1   font-semibold">
                Views
              </span>
              <span>:</span>
              <span className="inline-block px-2">{product.views}</span>
            </li>
            <li className="flex items-center  gap-2">
              <span className="inline-block min-w-[30%] w-fit  my-1   font-semibold">
                Status
              </span>
              <span>:</span>
              <span className="inline-block px-2"><button  onClick={handleStatusChangeBtn}  className="text-blue-600  hover:text-blue-700">{product.status}</button></span>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ProductDetail;

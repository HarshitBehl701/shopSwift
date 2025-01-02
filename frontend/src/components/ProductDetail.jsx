import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError,handleSuccess } from "../utils";
import { getSellerProducts , changeStatusProduct } from "../api/product";
import { Carousel } from "flowbite-react";
import ExpandableDescription   from "../components/ExpandableDescription"

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
      <h3 className="font-semibold   mb-3">Product Detail</h3>
      <div className="twoSectionLayout  flex md:flex-row  flex-col gap-4">
      <div className="leftSection md:w-1/3 w-full md:my-0 my-3 flex flex-col">
  <Carousel
    className="h-full rounded-none"
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
        className="w-full h-full object-top object-contain"
      />
    ))}
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
              <ExpandableDescription description={product.description} limit={100} />
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
                Total  Customer Rate
              </span>
              <span>:</span>
              <span className="inline-block px-2">{product.number_of_customer_rate}</span>
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

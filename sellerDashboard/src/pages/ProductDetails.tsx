import { useLocation } from "react-router-dom"
import { Card} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { IOrderModal, IProductModal } from "@/interfaces/commonInterfaces";
import { formatDate, getImagePathUrl, handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { Trash } from "lucide-react";
import { getProductAllOrders } from "@/api/orderApi";
import { IApiResponse, IGetAllOrdersOfProductResponse } from "@/interfaces/apiInterfaces";
import { manageProduct } from "@/api/productApi";
import { ToastContainer } from "react-toastify";
import EditProduct from "@/components/myComponents/EditProduct";

function ProductDetails() {
    const  location   =  useLocation();
    const [productData,setProductData] = useState(location.state as IProductModal || {});
    const  [images,setImages] = useState<string[]>(productData.images.split(","));

    const  [orders,setOrders] = useState<IOrderModal[] | null>(null);

    useEffect(() =>   {
      if(orders === null)
      {
        ;(async   () =>  {
          try {
            const response  = await getProductAllOrders({product_id:productData.id});

            if(response.status &&   response.data)
            {
              const   responseData = (response.data as IGetAllOrdersOfProductResponse)
              setOrders(responseData.orders)
            }else
              throw new  Error(response.message);


          } catch (error) {
            throw new  Error(handleCatchErrors(error));
          }
        })()
      }
    },[orders,productData.id]);

    const handleProductStatus  = useCallback(async  () =>  {
        if(window.confirm(`Are you  sure  you  want to change current  product  status   to  ${productData.status == 1  ? "Inactive" : "Active"}`))
        {
          try {
              const response  =  await manageProduct({product_id:productData.id,status:productData.status == 1  ? 0 : 1})  as  IApiResponse;
              if(response.status)
              {
                setProductData((prev)=>({...prev,status:productData.status == 1  ? 0 : 1}));
                handleToastPopup({message:"Successfully Change Product  Status",type:"success"});
              }else
                handleToastPopup({message:(response.message),type:"error"});
          } catch (error) {
            handleToastPopup({message:handleCatchErrors(error),type:"error"});
          }
        }
    },[productData.id,productData.status]);
  
    const  handleDeleteProductImage  = useCallback(async  (imagePath:string) =>  {
      if(window.confirm(`Are you  sure  you  want to Remove   this Picture`))
      {
        try {
            const response  =  await manageProduct({product_id:productData.id,deleteImages:imagePath})  as  IApiResponse;
            if(response.status)
            {
              setProductData((prev)=>({...prev,status:productData.status == 1  ? 0 : 1}));
              handleToastPopup({message:"Successfully Deleted Image",type:"success"});
            }else
              handleToastPopup({message:(response.message),type:"error"});
        } catch (error) {
          handleToastPopup({message:handleCatchErrors(error),type:"error"});
        }
      }
    },[productData.id,productData.status]);

  return (
    <div>
      <div className="capitalize text-2xl mb-4 font-semibold">{productData.product_name} <EditProduct productData={productData}  setProductData={setProductData} fieldName="product_name"/></div>
       <div className="">
      {/* Main Section */}
      <Card className="flex flex-col md:flex-row mb-3 gap-6 p-6 items-center md:items-start">
        {/* Left: Profile Image */}
        <div className="w-32 h-32">
          <Avatar className="w-full h-full">
            <AvatarImage src={getImagePathUrl('seller',productData.brand_logo)} alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>

        {/* Right: User Details */}
        <div className="flex-1 space-y-1">
          <div className="text-2xl font-semibold">Price : ₹ {productData.price} <EditProduct productData={productData}  setProductData={setProductData} fieldName="price"/></div>
          <p className="text-gray-600">Brand Name : {productData.brand_name}</p>
          <p className="text-gray-600">Created On : {formatDate(productData.created_at)}</p>
          <div className="text-gray-600">Category : {productData.category_name} <EditProduct productData={productData}  setProductData={setProductData} fieldName="category"/></div>
          <div className="text-gray-600">Sub Category : {productData.sub_category_name} <EditProduct productData={productData}  setProductData={setProductData} fieldName="sub_category"/></div>
        </div>
      </Card>

      {/* Bottom Section */}
      <Card className="mt-6 p-6">
        <h3 className="text-xl font-semibold">Additional Information</h3>
        {images.length > 0 && (
        <div className="flex items-center gap-4 flex-wrap">
          {images.map((image, index) => (
            <div className="image w-fit inline-block group  cursor-pointer border border-gray-300 relative rounded-md  shadow-md" key={index}>
              <img
                src={getImagePathUrl('product',image)}
                alt="preview"
                className="w-32 h-32 object-cover rounded-md"
              />
              <Button className="absolute hidden group-hover:flex  items-center  justify-center text-center cursor-pointer top-0  w-full h-full  text-red-500 backdrop-blur-xs" onClick={() => {handleDeleteProductImage(image);  setImages(images.filter(prevImage => prevImage !== image)) }}><Trash className="scale-150"/></Button>
            </div>
          ))}
          <EditProduct productData={productData}  setProductData={setProductData} fieldName="images"/>
        </div>
      )}
      <div>Description :  {productData.description} <EditProduct productData={productData}  setProductData={setProductData} fieldName="description"/></div>
      <div>Discount :  {productData.discount} <EditProduct productData={productData}  setProductData={setProductData} fieldName="discount"/></div>
      <p>Average  Rating :  {productData.average_rating}</p>
      <p>Number of Users  Rate :  {productData.number_of_customer_rate}</p>
      <p>Status :  <Button  variant={"link"} onClick={handleProductStatus} className="cursor-pointer">{productData.status ?  "Mark Inactive" :"Mark Active"}</Button></p>
      <p>Views :  {productData.views}</p>

      </Card>
    </div>
    <ToastContainer  />
    </div>
  )
}

export default ProductDetails
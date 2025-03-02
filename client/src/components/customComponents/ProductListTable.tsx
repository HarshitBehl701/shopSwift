import { IProductListTableParam } from "@/interfaces/componentInterfaces"
import ExpandableDescription from "./ExpandableDescription"
import ImageCarousel from "./ImageCarousel"
import { Link } from "react-router-dom"
import { useUserContext } from "@/contexts/userContext"
import LoadingProductListSkeleton from "../skeletons/LoadingProductListSk"

function ProductListTable({filteredProduct,request_page}:IProductListTableParam) {
    const {userData} = useUserContext();
  return (
    <div className="">
        {Array.isArray(filteredProduct) && filteredProduct.length > 0  &&
            filteredProduct.map((product)=>
                <Link to={`/${encodeURIComponent(userData?.user_name ??  "")}/${request_page?.toLowerCase()}/${product.product_name}&product_id=${product.id}`} state={product} className="block  my-4">
                    <div className="flex h-fit p-4 rounded-md gap-4 shadow-sm">
                        {/* Left Section */}
                        <div className="w-28 flex items-center justify-center">
                        <ImageCarousel images={product.images.split(",")}   type="product" imageCss="h-28" />
                        </div>

                        {/* Right Section */}
                        <div className="w-2/3">
                            <h4 className="font-semibold capitalize">{product.product_name}</h4>
                            <p className="capitalize">{product.brand_name}</p>
                            <ExpandableDescription description={product.description ?? ''}  maxLength={40} />
                            <p className="text-2xl">₹ {product.price -  product.discount} <small className="line-through  text-lg text-gray-500">(₹ {product.price})</small></p>
                        </div>
                    </div>
                </Link>
            )
        }  
        
        {!filteredProduct &&  <LoadingProductListSkeleton />}
         
        
        {(Array.isArray(filteredProduct)  && filteredProduct.length === 0)  && <p className="italic text-gray-500  mt-2">No products  to show...</p>}
    </div>
  )
}

export default ProductListTable
import { IProductCardParam } from "@/interfaces/componentInterfaces"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import ExpandableDescription from "./ExpandableDescription"
import { Heart } from "lucide-react"
import { useUserContext } from "@/contexts/userContext"
import { Link } from "react-router-dom"
import { useUtilFunctionsContext } from "@/contexts/utilFunctionsContext"
import ImageCarousel from "./ImageCarousel"

function ProductCard({productData}:IProductCardParam) {
  const {isLoggedIn,userData} = useUserContext();

  const {handleUserCart,handleUserWhislist} = useUtilFunctionsContext();

  return (
    <>
    <Link to={`/product_details/${encodeURIComponent(productData.product_name).toLowerCase()}?product_id=${productData.id.toString().toLowerCase()}&brand_name=${productData.brand_name.toLowerCase()}`} state={productData} className="block">
      <Card className="w-full cursor-pointer max-w-xs rounded-lg overflow-hidden shadow-lg bg-white">
      <CardHeader className="relative  p-0">
            <ImageCarousel mainCarouselCss="rounded-none" images={productData.images.split(',')} type="product" imageCss="h-44  w-full rounded-none object-contain" />
            {isLoggedIn && <Heart className={`absolute right-4 top-4 ${typeof 
              userData?.user_whislist  ==  'string' && userData?.user_whislist.split(",").includes(productData.id.toString()) ?  "stroke-red-500" : "stroke-gray-500"}  scale-125 cursor-pointer`} fill={typeof 
              userData?.user_whislist  ==  'string' && userData?.user_whislist.split(",").includes(productData.id.toString()) ?  "red" : "none"} onClick={() => handleUserWhislist(productData.id)} />}
      </CardHeader>
      <CardContent className="px-4   h-full">
        <h2 className="font-bold  capitalize text-gray-800 text-lg">{productData.product_name}</h2>
        <p className="font-semibold text-lg">₹ {productData.price - productData.discount} <small className="line-through  text-gray-400">({productData.price})</small></p>
        <p className="font-semibold capitalize">{productData.brand_name}</p>
        <div className="text-gray-600 text-sm mt-1"><ExpandableDescription description={productData.description}  maxLength={20} /></div>
        <div className="flex items-center justify-between mt-4">
          {isLoggedIn && <Button className={`text-xs w-full font-semibold cursor-pointer ${userData?.user_cart  && userData.user_cart.split(',').includes(productData.id.toString()) ?  'bg-red-500 hover:bg-red-600 text-white' : ''}`} onClick={() => handleUserCart(productData.id)}>{userData?.user_cart  && userData.user_cart.split(',').includes(productData.id.toString()) ? "Remove From Cart" : "Add To  Cart"}</Button>}
          {!isLoggedIn && <Button className="text-xs w-full font-semibold cursor-pointer">Show Details</Button>}
        </div>
      </CardContent>
      </Card>
    </Link>
    </>
  )
}

export default ProductCard
import { useEffect, useState } from "react";
import ProductsListing from "../components/customComponents/ProductsListing";
import Reviews from "../components/customComponents/Reviews";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { useLocation } from "react-router-dom";
import { IProductModal } from "@/interfaces/commonInterfaces";
import ExpandableDescription from "@/components/customComponents/ExpandableDescription";
import ImageCarousel from "@/components/customComponents/ImageCarousel";
import { Star } from "lucide-react";
import { useUserContext } from "@/contexts/userContext";
import { useUtilFunctionsContext } from "@/contexts/utilFunctionsContext";
import LoadingProductDetailsSk from "@/components/skeletons/LoadingProductDetailsSk";

function ProductDetails() {
  const location = useLocation();
  const { isLoggedIn, userData } = useUserContext();
  const { handleUserCart, handleUserWhislist,handlePlaceOrder } = useUtilFunctionsContext();
  const [product, setProduct] = useState<IProductModal | null>(
    (location.state as IProductModal) || null
  );

  useEffect(() => {
    setProduct(location.state);
  }, [location]);

  return (
    <>
      {product  &&  <div className="mb-8 w-[90%] mx-auto   my-16">
        <Card>
          <CardHeader>
            <div className="flex items-center flex-wrap gap-4">
              <h2 className="text-2xl font-semibold">
                {product?.product_name}
              </h2>
              <div className="flex items-center space-x-2">
                <Badge color="green">{`Rating: ${product?.average_rating} / 5`}</Badge>
              </div>
            </div>
          </CardHeader>
          <div className="flex px-6 md:flex-row flex-col">
            <div className="imageContainer md:w-48  w-full md:h-48  h-96">
              <ImageCarousel type="product" images={product?.images ?? []} />
            </div>
            <CardContent className="md:ml-6 md:p-2 p-0 md:mt-0 mt-7">
              <h2>
                <span className="font-semibold">Brand :</span>{" "}
                {product?.brand_name}
              </h2>
              <div className="text-gray-700">
                <ExpandableDescription
                  description={product?.description ?? ""}
                  maxLength={100}
                />
              </div>
              <h2 className="text-2xl font-bold">
                ₹{product ? product?.price - product?.discount : 0}{" "}
                <small className="line-through text-gray-500">
                  (₹{product?.price})
                </small>
              </h2>
              <div className="ratingCont flex gap-3 items-center  mt-3">
                <p className="font-semibold">Rating : </p>
                <div className="rating flex items-center gap-3">
                  {Array.from({ length: 5 }).fill(1).map((_,index) => (
                    <Star
                      key={Math.random()}
                      className={`${
                        product && product?.average_rating < index  + 1
                           ?"fill-gray-300 stroke-gray-400"
                           : "fill-yellow-500 stroke-yellow-500"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-lg  text-gray-500">
                  ({product?.number_of_customer_rate})
                </p>
              </div>
              <div className="flex gap-3 items-center mt-3">
                {isLoggedIn && product && (
                  <Button
                    className={`text-xs w-full font-semibold cursor-pointer ${
                      userData?.user_cart &&
                      userData.user_cart
                        .split(",")
                        .includes(product.id.toString())
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : ""
                    }`}
                    onClick={() => handleUserCart(product.id)}
                  >
                    {userData?.user_cart &&
                    userData.user_cart
                      .split(",")
                      .includes(product.id.toString())
                      ? "Remove From Cart"
                      : "Add To  Cart"}
                  </Button>
                )}

                {isLoggedIn &&
                  product &&
                  userData?.user_cart &&
                  userData.user_cart
                    .split(",")
                    .includes(product.id.toString()) && (
                    <Button className="bg-blue-600  hover:bg-blue-700 cursor-pointer" onClick={() => handlePlaceOrder(product.id,product.price-product.discount)}>
                      Place Order
                    </Button>
                  )}

                {isLoggedIn && product && (
                  <Button
                    className={`text-xs w-full font-semibold cursor-pointer ${
                      userData?.user_whislist &&
                      userData.user_whislist
                        .split(",")
                        .includes(product.id.toString())
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : ""
                    }`}
                    onClick={() => handleUserWhislist(product.id)}
                  >
                    {userData?.user_whislist &&
                    userData.user_whislist
                      .split(",")
                      .includes(product.id.toString())
                      ? "Remove From Whislist"
                      : "Add To Whislist"}
                  </Button>
                )}
              </div>
            </CardContent>
          </div>
          <CardFooter>
            <Reviews product_id={product?.id} />
          </CardFooter>
        </Card>
      </div>}
      {!product  && <LoadingProductDetailsSk />}
      <h1 className="font-semibold text-2xl mb-8 mt-12 md:ml-14 ml-7">
        View Similar Products
      </h1>
      <div className="products  w-[90%] mx-auto">
        <ProductsListing />
      </div>
    </>
  );
}

export default ProductDetails;

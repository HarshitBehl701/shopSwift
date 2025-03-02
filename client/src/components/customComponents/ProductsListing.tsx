import { usePageContext } from "@/contexts/pageContext";
import ProductCard from "../customComponents/ProductCard";
import { IProductListingParam } from "@/interfaces/componentInterfaces";
import LoadingProductCardSk from "../skeletons/LoadingProductCardSk";

function ProductsListing({newProducts}:IProductListingParam) {
  const {products} = usePageContext();
  return (
    <div className="w-full  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 justify-items-center">
      {newProducts &&  Array.isArray(newProducts)  ? newProducts?.map((product,index) =>  <ProductCard  key={product.product_name + index} productData={product} />) : products?.map((product,index) =>  <ProductCard  key={product.product_name + index} productData={product} />)}
      {!(newProducts  ||  products) && Array.from({length:3}).map(() => <LoadingProductCardSk key={Math.random()} />)}
    </div>
  )
} 

export default ProductsListing
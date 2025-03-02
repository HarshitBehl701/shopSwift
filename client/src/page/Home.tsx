import BrandsStrip from "@/components/customComponents/BrandsStrip"
import Categories from "../components/customComponents/Categories"
import HomeHeader from "../components/customComponents/HomeHeader"
import ProductsListing from "../components/customComponents/ProductsListing"

function Home() {
  
  return (
    <>
      <HomeHeader  />

      <Categories  />

      <h1 className="text-4xl mb-12 text-center font-semibold  italic">Top Brands!</h1>
      <BrandsStrip  />
      <br /><br />

      <h1 className="text-4xl my-12 text-center font-semibold  italic">Shop Products!</h1>
    
      <div className="products md:w-[85%] w-[90%] mx-auto">
      <ProductsListing   />
      </div>
  
      <br /><br />
    </>
  )
}

export default Home
import { usePageContext } from "@/contexts/pageContext";
import ProductsListing from "../components/customComponents/ProductsListing";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useCallback, useState } from "react";
import { IProductModal, ISubCategoryType } from "@/interfaces/commonInterfaces";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Shop = () => {
  const {categories,subCategories} = usePageContext();
  const [displaySubCategories,setDisplaySubCategories] =  useState<ISubCategoryType[] | null>(null);
  const  {products} =  usePageContext();
  const [filteredProducts,setFilteredProducts] = useState<IProductModal[] | null>(products);

  const  handleCategoryChangeSelection  =   useCallback((category_name:string) =>  {
    if(subCategories)
      setDisplaySubCategories(subCategories.filter((subCategory) => subCategory.category_name?.includes(category_name)))
  },[subCategories]);

  const handleFilterData = useCallback(({searchQuery = "", selectedCategory = "", selectedSubCategory = "", minPrice = "", maxPrice = ""}) => {
    if (!products) return;
  
    const filtered = products.filter((product) => {
      const matchesSearch = searchQuery ? Object.values(product).join(" , ").toLowerCase().includes(searchQuery.toLowerCase()) : true;
      const matchesCategory = selectedCategory ? product.category_name === selectedCategory : true;
      const matchesSubCategory = selectedSubCategory ? product.sub_category_name === selectedSubCategory : true;
      const matchesPrice = 
        minPrice || maxPrice
          ? (product.price - product.discount >= (parseInt(minPrice) || 0) && product.price - product.discount <= (parseInt(maxPrice) || Number.MAX_VALUE))
          : true;
  
      return matchesSearch && matchesCategory && matchesSubCategory && matchesPrice;
    });
  
    setFilteredProducts(filtered);
  }, [products]);

  return (
    <>
    <h1 className="mt-12  mb-4 text-center font-semibold  text-3xl  italic">Shop Products</h1>
    <div className="search">
        <div className="flex md:ml-auto md:mr-12 mx-auto items-center space-x-2 border  border-gray-300 p-2 rounded-lg w-full max-w-md shadow-sm">
          <Search className="w-5 h-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search Product..."
            className="flex-1 border-none focus-visible:ring-0 focus:ring-0 focus:outline-none shadow-none"
            onChange={(e) => handleFilterData({searchQuery:e.target.value})}
          />
          <Button variant="default" className="shadow-none">
            Search
          </Button>
        </div>
      </div>
    <div className="flex w-[90%]  mx-auto md:p-8 space-x-4 md:flex-nowrap flex-wrap md:gap-0  gap-8">
      {/* Left Sidebar - Filters */}
      <div className="md:w-1/4  w-full p-4 md:border-r">
        <div className="header flex items-center mb-4 justify-between">
        <h2 className="font-bold text-lg ">Filters</h2>
        <Button variant={"link"} className="p-0 cursor-pointer text-blue-500" onClick={() => window.location.reload()}>Clear  Filters</Button>
        </div>

        {/* Category Filter */}
        <Select onValueChange={(value) => {handleCategoryChangeSelection(value); handleFilterData({selectedCategory:value})}}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories && categories.map((category) => (
              <SelectItem key={category.category_name} value={category.category_name}>
                {category.category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {displaySubCategories  &&  Array.isArray(displaySubCategories) &&  displaySubCategories.length > 0 &&
        <Select onValueChange={(value) => handleFilterData({selectedSubCategory:value})}>
          <SelectTrigger className="w-full  mt-3">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {displaySubCategories.map((subCategory,index) => (
              <SelectItem key={subCategory.sub_category_name + index} value={subCategory.sub_category_name}>
                {subCategory.sub_category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        }


        {/* Price Range */}
        <div className="mt-4">
          <label className="block text-sm">Price Range</label>
          <div className="flex space-x-2">
            <Input type="number" placeholder="Min" className="w-1/2" onChange={(e) => handleFilterData({minPrice:e.target.value})} />
            <Input type="number" placeholder="Max" className="w-1/2" onChange={(e) => handleFilterData({maxPrice:e.target.value})} />
          </div>
        </div>

      </div>

      {/* Right Side - Product Listing */}
        <ProductsListing newProducts={filteredProducts} />

    </div>
    </>
  );
};

export default Shop;
import React, { useState, useEffect } from "react";
import { getProducts } from "../api/product";
import { categories } from "../api/category";
import { Link, useNavigate } from "react-router-dom";

function SearchComponent({ size }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [categoriesData, setcategories] = useState([]);
  const [subCategoriesData, setSubCategories] = useState([]);
  const [productsData, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const data = response.data.map((item) => item.name);
        setProducts(response.data.map((item) => [item.name,item.productId]));
        return data;
      } catch (error) {
        console.log(error.message);
        return [];
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await categories();
        const category = response.data.map((item) => item.name);
        const subCategory = [];
        response.data.forEach((item) =>
          item.subCategory.forEach((subitem) =>
            subCategory.push(`${subitem.name}-${item.name}`)
          )
        );

        setcategories(category);
        setSubCategories(subCategory);

        return category.concat(subCategory);
      } catch (error) {
        console.log(error.message);
        return [];
      }
    };

    const fetchData = async () => {
      const products = await fetchProducts();
      const categories = await fetchCategories();

      const combinedData = [...products, ...categories];
      setSearchData(combinedData);
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredResults = searchData.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFocus = () => {
    setIsSearchVisible(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsSearchVisible(false);
    }, 200);
  };

  const handleSearchFormSubmit = (ev) => {
    ev.preventDefault();
    navigate(`/products/${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className={`shrink-0 ${size}`}>
      <form onSubmit={handleSearchFormSubmit} className="w-full">
        <div className="relative">
          <div className="searchContainer shrink-0 flex items-center border border-zinc-200 bg-white rounded-full w-full">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="bg-transparent border-none outline-none w-full pl-4 pr-2 focus:ring-2 focus:ring-transparent rounded-full"
            />

            <input
              type="submit"
              value="Search"
              className="bg-[#BFD7EA] px-4 py-2 rounded-full cursor-pointer font-semibold"
            />
          </div>

          {/* Search Results Section */}
          {isSearchVisible && (
            <div
              className={`absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white shadow-md rounded-md w-full transition-all ease-in-out duration-300 z-10 ${
                searchQuery ? "block" : "hidden"
              }`}
            >
              <ul className="p-4">
                {filteredResults.length === 0 ? (
                  <li className="text-gray-500">No results found</li>
                ) : (
                  filteredResults.map((result, index) => {
                    let  link  = `/products/${encodeURIComponent(result)}`;
                    if(categoriesData.includes(result)) link =  `/products/${encodeURIComponent(result)}`;
                    else if(subCategoriesData.includes(result)) link =  `/products/${result.split('-')[1]}/${encodeURIComponent(result.split('-')[0])}`;
                    else {
                      productsData.forEach(element => {
                        if(element[0].toLowerCase() == result.toLowerCase())
                          {
                            link  =  `/product/${encodeURIComponent(element[1])}`;
                          }
                      });
                    }
                    return (
                      <Link
                        key={index}
                        to={link}
                      >
                        <li className="p-2 cursor-pointer hover:bg-gray-100 rounded-md">
                          {result}
                        </li>
                      </Link>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SearchComponent;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {handleSearchLogic} from  "../utils/commonHelper";

function SearchComponent({ size }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filteredResults,setFilteredResults]  = useState([]);
  const navigate = useNavigate();

  const handleSearchInputChange = async (e) => {
    setSearchQuery(e.target.value);
    const response = await handleSearchLogic(e.target.value);
    setFilteredResults(response);
  };

  const handleFocus = async () => {
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
                    return (
                      <Link
                        key={index}
                        to={result.link}
                      >
                        <li className="p-2 cursor-pointer hover:bg-gray-100 rounded-md">
                          {result.name}
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

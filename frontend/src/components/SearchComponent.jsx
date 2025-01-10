import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { handleSearchLogic } from "../utils/commonHelper";

function SearchComponent({ size }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
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
          <div className="searchContainer shrink-0 flex items-center border border-gray-300 bg-white rounded-full w-full shadow-sm">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="bg-transparent border-none w-full pl-4 pr-2 py-2 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent"
            />
            <input
              type="submit"
              value="Search"
              className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer font-medium hover:bg-blue-700 active:bg-blue-700 transition-all duration-300"
              style={{
                outline: "none",
                boxShadow: "none",
              }}
            />
          </div>

          {/* Search Results Section */}
          {isSearchVisible && (
            <div
              className={`absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white shadow-lg rounded-lg w-full transition-all ease-in-out duration-300 z-10 ${
                searchQuery ? "block" : "hidden"
              }`}
            >
              <ul className="p-4 space-y-2">
                {filteredResults.length === 0 ? (
                  <li className="text-gray-500 text-center">
                    No results found
                  </li>
                ) : (
                  filteredResults.map((result, index) => (
                    <Link key={index} to={result.link}>
                      <li className="p-3 cursor-pointer hover:bg-gray-100 rounded-lg text-gray-700 hover:text-blue-500 transition-all duration-200">
                        {result.name}
                      </li>
                    </Link>
                  ))
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

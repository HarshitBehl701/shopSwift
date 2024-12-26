import React from "react";

function SearchComponent({size}) {
  return (
    <div className={`shrink-0 ${size}`}>
      <form action="" className="w-full">
        <div className="searchContainer shrink-0 flex items-center border  border-zinc-200  bg-white rounded-full w-[100%]">
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent border-none outline-none w-full pl-4 pr-2 focus:ring-2 focus:ring-transparent rounded-full"
          />

          <input
            type="submit"
            value="Search"
            className="bg-[#BFD7EA] px-4 py-2 rounded-full cursor-pointer font-semibold"
          />
        </div>
      </form>
    </div>
  );
}

export default SearchComponent;

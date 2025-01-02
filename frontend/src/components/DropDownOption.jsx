import React, { useState } from "react";

function DropDownOption({ mainData, subData }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return <ul className="my-2">
    <li>
      <button
        onClick={toggleMenu}
        className="font-semibold flex items-center justify-between w-full"
      >
        {mainData.name.charAt(0).toUpperCase() +  mainData.name.slice(1)}
        <span
          className={`inline-block text-xl transition-transform ${
            isOpen ? "" : "rotate-[-45deg]"
          }`}
        >
          &#8735;
        </span>
      </button>
      <ul
        className={`w-[95%] transition-all overflow-hidden ${
          isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {subData.map((val,index)=> <li key={index} className="border-b hover:bg-blue-600 hover:text-white hover:font-semibold hover:rounded-lg text-sm mt-1 py-1 border-zinc-400 px-3">
          {val.name.charAt(0).toUpperCase() +  val.name.slice(1)}
        </li>)}
      </ul>
    </li>
  </ul>;
}

export default DropDownOption;

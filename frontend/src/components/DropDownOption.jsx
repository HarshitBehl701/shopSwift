import React, { useState } from "react";
import { Link } from "react-router-dom";

function DropDownOption({ mainData, subData }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if(subData.length  == 0){
    return (
      <ul className="my-2">
        <Link to={`/products/${mainData.name}`}>
        <li  className="font-semibold">{(mainData.name.indexOf('-'))  ?  mainData.name.split('-')[0].charAt(0).toUpperCase()  + mainData.name.split('-')[0].slice(1) + ' '   +  mainData.name.split('-')[1].charAt(0).toUpperCase()  + mainData.name.split('-')[1].slice(1) : mainData.name.charAt(0).toUpperCase()  + mainData.name.slice(1)}</li>
        </Link>
      </ul>
    )
  }

  return (
    <ul className="my-2">
      <li>
        <button
          onClick={toggleMenu}
          className="font-semibold flex items-center justify-between w-full"
        >
          {mainData.name.charAt(0).toUpperCase() + mainData.name.slice(1)}
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
          {subData.map((val, index) => (
            <Link key={index}  to={`/products/${mainData.name}/${val.name}`}>
            <li
              className="border-b hover:bg-blue-600 hover:text-white hover:font-semibold hover:rounded-lg text-sm mt-1 py-1 border-zinc-400 px-3"
            >
              {val.name.charAt(0).toUpperCase() + val.name.slice(1)}
            </li>
            </Link>
          ))}
        </ul>
      </li>
    </ul>
  );
}

export default DropDownOption;

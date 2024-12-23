import React from "react";
import { Link } from "react-router-dom";

function Cards({ imageObj, title, description }) {
  return (
    <div className="card border  w-52 h-64 shadow-md flex items-center justify-between flex-col rounded-lg  overflow-hidden">
      <img src={imageObj.src} alt={imageObj.alt} className="h-[75%]  w-full" />
      <div className="bottomSection  w-full  h-[25%] px-2 flex border items-center  justify-between">
        <div className="textContainerk w-3/4">
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-xs  italic overflow-hidden text-ellipsis whitespace-nowrap w-full">{description}</p>
        </div>
        <Link
          to={"/"}
          className="text-white rounded-full bg-blue-600 w-8  h-8 font-semibold flex  items-center justify-center hover:bg-blue-700"
        >
          {">"}
        </Link>
      </div>
    </div>
  );
}

export default Cards;

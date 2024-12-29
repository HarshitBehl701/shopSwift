import React from "react";
import { Link } from "react-router-dom";

function Cards({ imageSrc, imageAlt , title, description }) {
  return (
    <div className="card snap-center  shrink-0 border cursor-pointer md:w-52  min-w-36 md:h-64 h-52   shadow-md flex items-center justify-between flex-col rounded-lg  overflow-hidden">
    <img
          src={imageSrc || "https://placehold.co/300x200/png"}
          alt={imageAlt}
          className="h-[75%]  w-full  object-cover"
        />
        <div className="bottomSection  w-full  h-[25%] px-2 flex border items-center  justify-between">
          <div className="textContainer w-3/4">
            <h4 className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-full">{title}</h4>
            <p className="text-xs  italic overflow-hidden text-ellipsis whitespace-nowrap w-full">
              {description}
            </p>
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

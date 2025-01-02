import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";

function Cards({ imageSrcs, imageAlt, title, description ,  link}) {
  return (
    <div className="card snap-center  shrink-0 border cursor-pointer md:w-52  min-w-36 md:h-64 h-52   shadow-md flex items-center justify-between flex-col rounded-lg  overflow-hidden">
      <Carousel
        pauseOnHover
        indicators={false}
        controls={false}
        leftControl=" "
        rightControl=" "
      >
        {imageSrcs.map((image, index) => (
          <img
            key={index}
            src={`/uploads/other/${image}`}
            alt={imageAlt}
            className="h-full w-full  object-cover"
          />
        ))}
      </Carousel>
      <div className="bottomSection  w-full  h-[25%] px-2 flex border items-center  justify-between">
        <div className="textContainer w-3/4">
          <h4 className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-full">
            {title}
          </h4>
          <p className="text-xs  italic overflow-hidden text-ellipsis whitespace-nowrap w-full">
            {description}
          </p>
        </div>
        <Link
          to={link}
          className="text-white rounded-full bg-blue-600 w-8  h-8 font-semibold flex  items-center justify-center hover:bg-blue-700"
        >
          {">"}
        </Link>
      </div>
    </div>
  );
}

export default Cards;

import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";

function Cards({ imageSrcs, imageAlt, title, description, link }) {
  return (
    <div className="card snap-center shrink-0 border cursor-pointer md:w-52 w-40 md:h-64 h-64 shadow-md flex items-center justify-between flex-col rounded-lg overflow-hidden">
      <Carousel
        pauseOnHover
        indicators={false}
        controls={false}
        leftControl=" "
        rightControl=" "
        className="h-[75%]"
      >
        {imageSrcs.map((image, index) => (
          <img
            key={index}
            src={`/uploads/other/${image}`}
            alt={imageAlt}
            className="h-full w-full object-cover object-top"
          />
        ))}
      </Carousel>
      <div className="bottomSection w-full h-[25%] px-2 flex border-t items-center justify-between">
        <div className="textContainer w-3/4">
          <h4 className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </h4>
          <p className="text-xs italic overflow-hidden text-ellipsis whitespace-nowrap">
            {description}
          </p>
        </div>
        <Link
          to={link}
          className="text-white rounded-full bg-blue-600 w-8 h-8 font-semibold flex items-center justify-center hover:bg-blue-700"
        >
          {">"}
        </Link>
      </div>
    </div>
  );
}

export default Cards;

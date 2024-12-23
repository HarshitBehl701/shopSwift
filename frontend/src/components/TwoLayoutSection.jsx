import React from "react";
import { Link } from "react-router-dom";

function TwoLayoutSection({ imageObj, heading, description, linkObj }) {
  return (
    <div
      className={
        imageObj.direction == "left"
          ? "layout w-full h-72 flex items-center justify-center"
          : "layout w-full h-72 flex items-center justify-center flex-row-reverse"
      }
    >
      <div className="leftSection w-full  py-10 px-20 h-full">
        <div
          className="imageContainer w-full h-full overflow-hidden rounded-md shadow-md bg-center bg-cover"
          style={{ backgroundImage: `url('${imageObj.imageLink}')` }}
        ></div>
      </div>
      <div
        className={
          imageObj.direction == "left"
            ? "rightSection p-10 w-full h-full"
            : "rightSection p-10 w-full h-full  px-20"
        }
      >
        <div className="textContainer">
          <h1 className="text-2xl ">{heading}</h1>
          <p className="italic text-sm overflow-hidden text-ellipsis whitespace-nowrap  mb-2">
            {description}
          </p>
        </div>
        {linkObj.required && (
          <Link
            to={linkObj.redirectPath}
            className="px-2  py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-white  font-semibold text-sm"
          >
            {linkObj.text}
          </Link>
        )}
      </div>
    </div>
  );
}

export default TwoLayoutSection;

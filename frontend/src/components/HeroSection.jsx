import React from "react";
import { Carousel } from "flowbite-react";

function HeroSection() {
  const imagesArr = ["slider1.jpg", "slider2.jpg"];
  const sliderText = [
    {
      title: "Welcome to Your Dream Store",
      description: "Discover a wide range of premium products designed to bring comfort, style, and functionality to your home. Start your journey to better living today!",
    },
    {
      title: "Explore Our Latest Collection",
      description: "Dive into our handpicked selection of the finest home essentials, decor, and lifestyle products. Elevate your home with quality you can trust and designs you’ll love.",
    }    
  ];

  return (
    <div className="heroSection py-12 md:px-20 px-8">
  <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 relative">
    <Carousel>
      {imagesArr.map((image,index) => (
        <div className="relative h-full" key={index}>
          <img
            src={`/assets/${image}`}
            alt={image}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 text-white w-full h-full flex items-center justify-center flex-col">
            <h1 className="md:text-3xl text-xl  md:mb-2 mb-1">{sliderText[index].title}</h1>
            <p  className="w-[50%] md:text-sm text-xs text-center italic">{sliderText[index].description}</p>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
</div>
  );
}

export default HeroSection;

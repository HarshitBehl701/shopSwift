import React, { useEffect, useState } from "react";
import Cards from "./Cards";
function MultiCardDisplaySection({heading,  cardsData}) {
  return (
    <div className="sliderCards  my-10 py-4 w-full">
      <h3 className="text-center    text-2xl font-semibold">{heading}</h3>
      <div className="cardsContainer mt-8 px-4 justify-center w-[90%] mx-auto flex items-center flex-wrap gap-4 overflow-hidden">
        {cardsData.map((card, index) => {
          return (
            <Cards
              key={index}
              imageObj={card.imageObj}
              title={card.title}
              description={card.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MultiCardDisplaySection;

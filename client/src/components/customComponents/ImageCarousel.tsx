import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { getImagePathUrl } from "@/utils/commonUtils";
import { IImageCarouselParam } from "@/interfaces/componentInterfaces";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

function ImageCarousel({ images, type ,imageCss,mainCarouselCss}: IImageCarouselParam) {
  const [imageList] = useState(Array.isArray(images) ? images : images.split(","));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [imageList.length]);

  return (
    <Carousel className={cn("w-full h-full overflow-hidden rounded-md shadow-sm",mainCarouselCss)}>
      <CarouselContent style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: "transform 0.5s ease-in-out" }}>
        {imageList.map((image, index) => (
          <CarouselItem key={index} className="w-full flex-shrink-0">
            <Avatar className="shadow-sm">
              <AvatarImage className={cn('object-cover h-full',imageCss)} src={getImagePathUrl(type, image)} />
              <AvatarFallback>
                <img
                  src={getImagePathUrl("main", 'logo.png')}
                  alt={image}
                  className={"object-cover rounded-lg"}
                />
              </AvatarFallback>
            </Avatar>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default ImageCarousel;

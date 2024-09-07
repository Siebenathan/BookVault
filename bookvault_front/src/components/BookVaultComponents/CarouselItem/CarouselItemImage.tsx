import { ReactNode } from "react";

interface CarouselItemImageInterface {
  imgSrc: string;
  style?: string;
  alt?: string;
}

export default function CarouseItemImage({
  imgSrc,
  style,
  alt
}: CarouselItemImageInterface) {
  return (
    <img
      className={`w-[200px] h-[200px] rounded-xl ${style}`}
      src={imgSrc}
      alt={alt ? alt : imgSrc + "-image"}
    />
  );
}

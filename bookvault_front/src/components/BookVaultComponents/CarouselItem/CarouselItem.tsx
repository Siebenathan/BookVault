import { Link } from "react-router-dom";

interface CarouselItemInterface {
  text: string;
  imgSrc: string;
  to: string;
  alt?: string;
  style?: string;
}

export default function CarouselItem({
  text,
  imgSrc,
  alt,
  to,
}: CarouselItemInterface) {
  return (
    <div
      className={`w-full max-w-[200px] h-fit flex flex-col items-center justify-center p-1`}
    >
      <img
        className={`w-fit max-h-[200px] rounded-xl`}
        src={imgSrc}
        alt={alt ? alt : imgSrc + "-image"}
      />
      <Link
        to={to}
        className="overflow-hidden text-ellipsis max-h-[45px] block"
      >
        {text}
      </Link>
    </div>
  );
}

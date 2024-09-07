import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CarouselItemLinkInterface {
  text: string;
  to: string;
  style?: string;
}

export default function CarouseItemLink({
  text,
  style,
  to,
}: CarouselItemLinkInterface) {
  return (
    <Link to={to} className={`overflow-hidden text-ellipsis max-h-[45px] block ${style}`}>
      {text}
    </Link>
  );
}

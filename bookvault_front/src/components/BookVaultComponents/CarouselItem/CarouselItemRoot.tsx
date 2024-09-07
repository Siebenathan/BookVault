import { ReactNode } from "react";

interface CarouselItemRoot {
  children: ReactNode;
  style?: string;
}

export default function CarouselItemRoot({
  children,
  style,
}: CarouselItemRoot) {
  return (
    <div
      className={`w-full max-w-[200px] h-full p-1 ${style}`}
    >
      {children}
    </div>
  );
}

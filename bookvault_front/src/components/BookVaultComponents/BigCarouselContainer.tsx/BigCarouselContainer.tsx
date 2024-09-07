import { ReactNode } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

interface BigCarouselContainerInterface {
  children: ReactNode;
  onClickForward: () => void;
  onClickBackward: () => void;
  style?: string;
}

export default function BigCarouselContainer({
  children,
  style,
  onClickBackward,
  onClickForward
}: BigCarouselContainerInterface) {
  return (
    <div className={`rounded-xl p-10 max-w-[1000px] ${style}`}>
      <div className={`grid grid-cols-4 grid-rows-2 bg-inherit`}>
        {children}
      </div>
      <div className="flex justify-center py-4">
        <div className="w-4/5 bg-inherit flex justify-between">
          <button onClick={onClickBackward}>
            <FaArrowAltCircleLeft className="text-5xl" />
          </button>
          <button onClick={onClickForward}>
            <FaArrowAltCircleRight className="text-5xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

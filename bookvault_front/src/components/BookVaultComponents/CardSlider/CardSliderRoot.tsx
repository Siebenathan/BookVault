import { ReactNode } from "react";

interface CardSliderRootInterface {
    children: ReactNode;
    className: string;
}

export default function CardSliderRoot({children, className} : CardSliderRootInterface) {
    return <div className={`flex flex-col justify-center items-center ${className}`}>{children}</div>;
}
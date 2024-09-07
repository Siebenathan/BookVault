import { ReactNode } from "react";

interface SimpleModalContentRootInterface {
  children: ReactNode;
  className?: string;
}

export default function SimpleModalContentRoot({
  children,
  className,
}: SimpleModalContentRootInterface) {
  return (
    <div
      className={`flex flex-col items-center text-center gap-8 p-[100px] ${className}`}
    >
      {children}
    </div>
  );
}

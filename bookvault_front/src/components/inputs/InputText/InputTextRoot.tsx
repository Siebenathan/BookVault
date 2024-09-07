import { ReactNode } from "react";

interface InputTextRootInterface {
  children: ReactNode;
  style?: "flex flex-col justify-center" | "flex justify-center items-center" | undefined
  className?: string;
}

export default function InputTextRoot({
  children,
  className,
}: InputTextRootInterface) {
  return <div className={className}>{children}</div>;
}

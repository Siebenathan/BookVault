import { ReactNode } from "react";

interface ContainerInterface {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerInterface) {
  return (
    <div className={`w-full max-w-[1280px] p-0 m-0 h-full ${className}`}>{children}</div>
  );
}

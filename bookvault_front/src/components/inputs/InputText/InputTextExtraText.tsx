import { ReactNode } from "react";

interface InputTextExtraTextInterface {
  text: ReactNode;
  className: string;
}

export default function InputTextExtraText({
  text,
  className,
}: InputTextExtraTextInterface) {
  return <p className={className}>{text}</p>;
}

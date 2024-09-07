import { ReactNode } from "react";

interface InputTextLabelInterface {
  children: ReactNode;
  className: string;
  text: string;
}

export default function InputTextLabel({
  children,
  className,
  text,
}: InputTextLabelInterface) {
  return (
    <label className={`text-xl ${className}`}>
      {text}
      {children}
    </label>
  );
}

import { ElementType } from "react";

interface InputTextIconInterface {
  icon: ElementType;
  className: string;
}

export default function InputTextIcon({
  icon: Icon,
  className,
}: InputTextIconInterface) {
  return <Icon className={className}/>;
}

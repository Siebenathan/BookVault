import { ElementType, useState } from "react";

interface InputTextChangeIconInterface {
  firstIcon: ElementType;
  secondIcon: ElementType;
  firstIconStyle: string;
  secondIconStyle: string;
  condition: boolean;
}

export default function InputTextChangeIcon({
  firstIcon: FirstIcon,
  secondIcon: SecondIcon,
  secondIconStyle,
  firstIconStyle,
  condition,
}: InputTextChangeIconInterface) {
  return condition ? (
    <FirstIcon className={firstIconStyle} />
  ) : (
    <SecondIcon className={secondIconStyle} />
  );
}

import { ElementType } from "react";

interface SearchComponentIconInterface {
  icon: ElementType;
  onClick: () => void;
  hoverColor?: string;
  iconColor?: string;
  iconHoverColor?: string;
  backgroundColor?: string;
}

export function SearchComponentIcon({
  icon: Icon,
  onClick,
  hoverColor,
  iconColor,
  iconHoverColor,
  backgroundColor,
}: SearchComponentIconInterface) {
  return (
    <button
      onClick={onClick}
      className={`w-fit bg-${backgroundColor} transition delay-150 box-border ease-in-out rounded-e-2xl`}
    >
      <Icon
        className={`box-border px-4 h-full transition delay-150 ease-in-out w-full text-${iconColor} hover:text-${iconHoverColor} rounded-e-2xl hover:bg-${hoverColor}`}
      />
    </button>
  );
}

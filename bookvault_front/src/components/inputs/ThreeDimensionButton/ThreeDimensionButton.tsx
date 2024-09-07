import { ButtonHTMLAttributes, DetailedHTMLProps, ElementType, ReactNode } from "react";
import { useState, useEffect } from "react";

interface ThreeDimensionButtonInterface {
  icon: ElementType;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  className?: string;
  iconSize?: string;
}

export default function ThreeDimensionButton({icon: Icon, type, onClick, className, iconSize}: ThreeDimensionButtonInterface) {
  return (
    <button
      className={`border-none rounded-2xl font-sans
      text-lg text-black font-bold cursor-pointer
      transition delay-100 ease-linear ${className}`}
      type={type}
      onClick={onClick}
    ><Icon className={`${iconSize}`}/></button>
  );
}

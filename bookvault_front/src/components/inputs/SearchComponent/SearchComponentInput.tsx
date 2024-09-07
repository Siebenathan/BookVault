import { ReactNode } from "react";

interface SearchComponentInputInterface {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  style?: string;
}

export function SearchComponentInput({
  placeholder,
  value,
  onChange,
  style
}: SearchComponentInputInterface) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border-none rounded-s-2xl p-3 w-4/5 ${style}`}
    />
  );
}

import { ReactNode } from "react";

interface SearchInputRootInterface {
  children: ReactNode;
}

export function SearchComponentRoot({ children }: SearchInputRootInterface) {
  return (
    <form className="flex w-full h-full min-h-16 max-h-40 justify-center item">
      {children}
    </form>
  );
}

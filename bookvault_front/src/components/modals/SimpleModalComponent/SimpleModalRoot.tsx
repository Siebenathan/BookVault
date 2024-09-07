import { ReactNode } from "react";

interface SimpleModalRootInterface {
  children: ReactNode;
  isOpen: boolean;
}

export default function SimpleModalRoot({
  children,
  isOpen,
}: SimpleModalRootInterface) {
  if (isOpen) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.7)] z-50">
        <main className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white">
          {children}
        </main>
      </div>
    );
  }

  return null;
}

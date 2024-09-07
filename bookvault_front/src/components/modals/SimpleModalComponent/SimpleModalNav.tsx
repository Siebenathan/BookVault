import { ElementType } from "react";
import Button from "../../inputs/Button";
import { MdCancel } from "react-icons/md";

interface SimpleModalNavInterface {
  setIsOpen: (a: boolean) => void;
  styleCloseButton?: string;
  styleNavigator?: string;
}

export default function SimpleModalNav({
  styleCloseButton,
  styleNavigator,
  setIsOpen,
}: SimpleModalNavInterface) {
  return (
    <nav className={`bg-black-blacker w-full p-4 flex justify-end ${styleNavigator}`}>
      <button onClick={() => setIsOpen(false)}>
        <MdCancel className={`text-red-500 text-3xl ${styleCloseButton}`} />
      </button>
    </nav>
  );
}

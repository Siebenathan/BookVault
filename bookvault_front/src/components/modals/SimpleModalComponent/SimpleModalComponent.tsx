import { ElementType } from "react";
import Button from "../../inputs/Button";
import { MdCancel } from "react-icons/md";



interface SimpleModalComponentInterface {
  isOpen: boolean;
  setIsOpen: (a: boolean) => void;
  modalTitle: string;
  modalText: string;
  btnText: string;
  icon: ElementType;
}

export default function SimpleModalComponent({
  isOpen,
  modalTitle,
  modalText,
  btnText,
  icon: Icon,
  setIsOpen
}: SimpleModalComponentInterface) {
  if (isOpen) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.7)] z-50">
        <main className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white">
          <nav className="bg-black-blacker w-full p-4 flex justify-end">
            <button onClick={() => setIsOpen(false)}><MdCancel className="text-red-500 text-3xl"/></button>
          </nav> 
          <div className="flex flex-col items-center text-center gap-8 p-[100px]">
            <h1 className="text-3xl">
              <Icon className="text-5xl inline" /> {modalTitle}
            </h1>
            <p className="text-lg">{modalText}</p>
            <Button
              text="Ok"
              onClick={() => {}}
              type="submit"
              className="bg-black-blacker text-white py-2 px-5 w-1/2 text-xl rounded-md hover:bg-verde-green col-span-2 h-full"
            />
          </div>
        </main>
      </div>
    );
  }

  return null;
}

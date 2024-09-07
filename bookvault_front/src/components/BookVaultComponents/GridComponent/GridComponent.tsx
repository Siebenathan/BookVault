import { GetBookInterface } from "../../../services/BookVaultApi/BookVaultAPIInterfaces";
import { Guid } from "js-guid";
import { GoBook } from "react-icons/go";
import capitalizeString from "../../../utilis/capitalizeString";
import { PiPencilLineBold } from "react-icons/pi";

interface GridComponentInterface {
  props: GetBookInterface;
}

export default function GridComponent({ props }: GridComponentInterface) {
  return (
    <div className="flex flex-col items-center w-4/5">
      <div className="bg-azul-claro flex justify-center">
        <img
          src={props.bookCoverUrl}
          alt={props.bookName + Guid.newGuid()}
          className="w-[200px] h-[250px] rounded-lg p-5"
        />
      </div>
      <div className="w-full flex items-center mt-1">
        <GoBook className="text-p text-black inline ml-3" />
        <p className="text-left text-p inline ml-3">Livro</p>
      </div>
      <div className="w-full flex flex-col items-center">
        <p className="font-bold text-left text-h6 px-3 w-full">
          {capitalizeString(props.bookName)}
        </p>
      </div>
      <div className="w-full flex items-center mt-1">
        <PiPencilLineBold className="text-p text-black ml-3" />
        <p className="text-left text-p px-3">
          {capitalizeString(props.authorName)}
        </p>
      </div>
    </div>
  );
}

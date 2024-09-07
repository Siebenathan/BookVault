import { useState } from "react";
import { Guid } from "js-guid";
import { GetBookInterface } from "../../../services/BookVaultApi/BookVaultAPIInterfaces";
import capitalizeString from "../../../utilis/capitalizeString";
import ThreeDimensionButton from "../../inputs/ThreeDimensionButton/ThreeDimensionButton";
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface BookSliderItemInterface {
  props: GetBookInterface;
}

export default function BookSliderItem({ props }: BookSliderItemInterface) {
  const limitOfCharactersInSynopsis = 100;

  const navigate = useNavigate();

  console.log(props.bookIdentifier);

  function capSinopsys(synopsis: string) {
    let cappedSynopis = synopsis.substring(0, limitOfCharactersInSynopsis);

    if(cappedSynopis.endsWith(" ")) {
      cappedSynopis = cappedSynopis.slice(0, limitOfCharactersInSynopsis - 2);
    }

    return cappedSynopis + "...";
  }

  return (
    <div
      className="flex flex-col items-center text-center w-full h-full"
      key={props.bookName + "-" + Guid.newGuid()}
    >
      <div className="relative w-full h-inherit">
        <img
          src={props.bookCoverUrl}
          alt="book_image"
          className="rounded-md w-full h-full border-2 border-slate-600 object-fill"
        />
        <div
          className="absolute top-0 opacity-0 w-full h-full z-10 hover:opacity-100 
          bg-[rgba(0,0,0,0.8)] transition ease-in-out delay-600 rounded-md object-fill
          flex items-center justify-center flex-col p-4"
        >
          <h1 className="text-white font-bold text-h6">{capitalizeString(props.bookName)}</h1>
          <small className="text-white">{props.authorName}</small>
          <p className="text-white h-1/3 text-ellipsis overflow-hidden mt-5">{capSinopsys(props.synopsis)}</p>
          <ThreeDimensionButton
              icon={FaBook}
              iconSize="text-3xl"
              onClick={() => navigate(`/book/${props.bookIdentifier.replaceAll(" ", "%20")}`)}
              className="px-14 py-2 bg-erin-green shadow-[0px_8px_#027820] active:translate-y-2 active:shadow-[0px_0px_#027820] mt-5"
            />
        </div>
      </div>
    </div>
  );
}

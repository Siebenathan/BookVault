import { Container } from "../components/Layout/Container";
import { useEffect, useState } from "react";
import { GetBookAndAuthorByIdentifier } from "../services/BookVaultApi/BookVaultAPI";
import { ColorRing } from "react-loader-spinner";
import capitalizeString from "../utilis/capitalizeString";
import { useParams } from "react-router-dom";
import {
  GetBookInterface,
  GetAuthorInterface,
} from "../services/BookVaultApi/BookVaultAPIInterfaces";
import formatDateDayMonthYear from "../utilis/formatDateDayMonthYear";

export default function BookPage() {
  const [book, setBook] = useState<GetBookInterface | null>(null);
  const [author, setAuthor] = useState<GetAuthorInterface | null>(null);
  const { bookIdentifier } = useParams();

  useEffect(() => {
    if (bookIdentifier) {
      GetBookAndAuthorByIdentifier(bookIdentifier).then((bookAndAuthor) => {
        if (bookAndAuthor == null) {
          //adicionar código aqui, estou fazendo o alert lá na função e isso tá errado.
          return;
        }

        console.log(bookAndAuthor);

        setBook(bookAndAuthor.book);
        setAuthor(bookAndAuthor.author);
      });
    }
  }, []);

  function genresToString(genres: string[]): string {
    const concatenetedString: string = genres.reduce(
      (acc: string, item: string, index) => {
        if (genres.length - 1 == index) {
          return `${acc} ${item}`;
        }
        return `${acc} ${item},`;
      },
      ""
    );
    return concatenetedString;
  }

  return (
    <div className="flex justify-center w-full h-full">
      <Container className="p-20 w-full h-full bg-verde-green">
        {book != null && author != null ? (
          <>
            <div className="flex justify-center gap-10">
              <div className="h-[700px] w-1/2 overflow-hidden shadow-2xl">
                <img
                  className="rounded-xl w-full h-full border-2 border-black object-fill"
                  src={book.bookCoverUrl}
                />
              </div>
              <div className="w-1/2 h-2/3 flex flex-col items-center">
                <h1 className="text-white text-h1 text-center font-bold">
                  {capitalizeString(book.bookName)}
                </h1>
                <div className="text-center">
                  <img
                    className="w-[40px] h-[40px] inline mr-2 rounded-lg"
                    src={author.imageOfTheAuthor}
                  ></img>
                  <h2 className="inline-block text-h6 text-white">
                    {author.authorName}
                  </h2>
                </div>
                <div className="text-white text-justify text-h4 mt-5">
                  <p>
                    <span className="underline">Publication Date</span>:{" "}
                    {formatDateDayMonthYear(book.publicationDate)}
                  </p>
                  <p>
                    <span className="underline">Number of Pages</span>:{" "}
                    {book.numberOfPages}
                  </p>
                  <p>
                    <span className="underline">Genres</span>:{" "}
                    {genresToString(book.bookGender)}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-white">
              <h1 className="text-center text-h2 mt-14">Synopsis</h1>
              <p className="text-justify mt-10 text-h6 px-10">{book.synopsis}</p>
            </div>
          </>
        ) : (
          <div>
            <ColorRing
              visible={true}
              height="100%"
              width="100%"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        )}
      </Container>
    </div>
  );
}

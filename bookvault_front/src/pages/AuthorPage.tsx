import { Container } from "../components/Layout/Container";
import { useEffect, useState } from "react";
import { GetAuthorAndAllHisBooks } from "../services/BookVaultApi/BookVaultAPI";
import { ColorRing } from "react-loader-spinner";
import capitalizeString from "../utilis/capitalizeString";
import { useParams } from "react-router-dom";
import {
  GetBookInterface,
  GetAuthorInterface,
} from "../services/BookVaultApi/BookVaultAPIInterfaces";
import formatDateDayMonthYear from "../utilis/formatDateDayMonthYear";

export default function AuthorPage() {
  const [books, setBooks] = useState<GetBookInterface[] | null>(null);
  const [author, setAuthor] = useState<GetAuthorInterface | null>(null);
  const { authorName } = useParams();

  useEffect(() => {
    if (authorName) {
      GetAuthorAndAllHisBooks(authorName).then((authorAndBooks) => {
        if (authorAndBooks == null) {
          //adicionar código aqui, estou fazendo o alert lá na função e isso tá errado.
          return;
        }

        setBooks(authorAndBooks.books);
        setAuthor(authorAndBooks.author);
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
        {author != null && books != null ? (
          <>
            <div className="flex justify-center">
              <div className="w-2/5">
                <img
                  className="w-[300px] h-[300px]"
                  src={author.imageOfTheAuthor}
                ></img>
              </div>
              <div className="w-3/5 text-white flex flex-col items-center gap-10">
                <h1 className="text-h1 w-4/5 text-center">{author.authorName}</h1>
                <p className="text-justify text-h6">
                  Date of Birht: {author.dateOfBirth}
                  <br />
                  Country of Birth: {author.countryOfBirth}
                  <br />
                  Number of Books: {books.length}
                </p>
              </div>
            </div>
            <div className="px-20">
              <h1 className="text-center text-white text-h2 mt-16">Synopsis</h1>
              <p className="text-justify text-white text-p mt-10">{author.authorSynopsis}</p>
            </div>
            {/* Tabela de livros */}
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

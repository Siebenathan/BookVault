import { Container } from "../components/Layout/Container";
import { useEffect, useRef, useState } from "react";
import { GetBooksByName } from "../services/BookVaultApi/BookVaultAPI";
import { ColorRing } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { GetBookInterface } from "../services/BookVaultApi/BookVaultAPIInterfaces";
import GridComponent from "../components/BookVaultComponents/GridComponent/GridComponent";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SearchBooksPage() {
  const [books, setBooks] = useState<GetBookInterface[] | null>(null);
  const [observerIsVisible, setObserverVisible] = useState<boolean>(false);
  const { bookName } = useParams();
  const navigate = useNavigate();

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const containerRef = useRef(null);



  useEffect(() => {
    if (bookName == undefined || bookName == null) {
      return;
    }

    GetBooksByName(bookName).then((books) => {
      if (books == null) {
        //adicionar código aqui, estou fazendo o alert lá na função e isso tá errado.
        return;
      }
      console.log(books);
      setBooks(books);
    });
  }, []);

  function callBackFunction(entries: any) {
    const [entry] = entries;
    setObserverVisible(entry.isIntersecting);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callBackFunction, options);

    if(containerRef.current) observer.observe(containerRef.current);

    return () => {
      if(containerRef.current) observer.unobserve(containerRef.current);
    }
  }, [containerRef, options]);

  function genresToString(genres: string[]): string {
    let concatenetedString: string = genres.reduce(
      (acc: string, item: string, index) => {
        return `${acc} ${item},`;
      },
      ""
    );

    //Remove a virgula no final
    concatenetedString = concatenetedString.slice(
      0,
      concatenetedString.lastIndexOf(",")
    )[0];

    return concatenetedString;
  }

  return (
    <div className="flex justify-center w-full h-full">
      <Container className="py-16 px-20 w-full h-full bg-verde-green">
        <div className="flex justify-center items-center flex-col w-full">
          <h1 className="text-white text-h1 text-center w-2/3">
            Results finded with "{bookName}"
          </h1>
          <div className="mt-10 grid grid-cols-4 bg-white rounded-2xl h-fit min-h-[8] w-full shadow-xl p-10">
            {books != null ? (
              books.map((item) => <GridComponent props={item} />)
            ) : (
              <Skeleton count={5} />
            )}
          </div>
          <div className="w-1 h-1" ref={containerRef}></div>
        </div>
      </Container>
    </div>
  );
}

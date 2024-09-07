import { Swiper, SwiperSlide } from "swiper/react";
import { Container } from "../components/Layout/Container";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetAllBooks } from "../services/BookVaultApi/BookVaultAPI";
import { GetBookInterface } from "../services/BookVaultApi/BookVaultAPIInterfaces";
import { ColorRing } from "react-loader-spinner";
import BookSliderItem from "../components/BookVaultComponents/BookSliderItem/BookSliderItem";
import { SearchComponentIcon } from "../components/inputs/SearchComponent/SearchComponentIcon";
import { SearchComponentRoot } from "../components/inputs/SearchComponent/SearchComponentRoot";
import { SearchComponentInput } from "../components/inputs/SearchComponent/SearchComponentInput";
import { FaSearch } from "react-icons/fa";

export default function BooksPage() {
  const [allBooks, setAllBooks] = useState<GetBookInterface[]>([]);
  const navigate = useNavigate();
  const [searchInputText, setSearchInputText] = useState<string>("");

  useEffect(() => {
    GetAllBooks().then((books) => {
      if (books != null) {
        console.log(books);
        setAllBooks(books);
      }
    });
  }, []);

  function hasGender(book: GetBookInterface, gender: string): boolean {
    return book.bookGender.includes(gender);
  }

  return (
    <div className="flex justify-center">
      <Container className="bg-verde-green p-5 flex justify-center items-center flex-col">
        <h1 className="text-white text-center text-h2 mt-10">
          Search for a book here
        </h1>
        <div className="w-1/2 flex justify-center mt-5">
          <SearchComponentRoot>
            <SearchComponentInput
              placeholder="Search for a book..."
              value={searchInputText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchInputText(e.currentTarget.value)
              }
              style="placeholder:text-xl text-xl"
            />
            <SearchComponentIcon
              icon={FaSearch}
              onClick={() => {
                navigate(
                  `/books/search/${searchInputText.trim().replaceAll(" ", "%20")}`
                );
              }}
              hoverColor="black"
              backgroundColor="white"
              iconColor="black"
              iconHoverColor="white"
            />
          </SearchComponentRoot>
        </div>
        <h1 className="text-white text-center text-h2 mt-10">Romances</h1>
        <div className="w-4/5 mt-5 bg-white p-10 rounded-md h-[400px]">
          {allBooks.length != 0 ? (
            <>
              <Swiper
                modules={[Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                slidesPerView={3}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper: any) => console.log(swiper)}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                className="h-full w-full"
              >
                {allBooks.map((book) => {
                  if (hasGender(book, "Romance")) {
                    return (
                      <SwiperSlide>
                        <BookSliderItem
                          key={book.bookIdentifier}
                          props={book}
                        />
                      </SwiperSlide>
                    );
                  }
                  return null;
                })}
              </Swiper>
            </>
          ) : (
            <div className="w-full flex justify-center p-10 h-full">
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
        </div>
      </Container>
    </div>
  );
}

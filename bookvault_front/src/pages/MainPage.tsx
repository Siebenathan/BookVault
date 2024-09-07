import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { useState } from "react";
// import SearchInput from "../components/inputs/SearchComponent/SearchInput";
import { SearchComponentRoot } from "../components/inputs/SearchComponent/SearchComponentRoot";
import { SearchComponentInput } from "../components/inputs/SearchComponent/SearchComponentInput";
import { SearchComponentIcon } from "../components/inputs/SearchComponent/SearchComponentIcon";
import { FaSearch } from "react-icons/fa";
import { Container } from "../components/Layout/Container";
import CarouselItem from "../components/BookVaultComponents/CarouselItem/CarouselItem";
import CarouselItemRoot from "../components/BookVaultComponents/CarouselItem/CarouselItemRoot";
import CarouseItemImage from "../components/BookVaultComponents/CarouselItem/CarouselItemImage";
import CarouseItemLink from "../components/BookVaultComponents/CarouselItem/CarouselItemLink";
import BigCarouselContainer from "../components/BookVaultComponents/BigCarouselContainer.tsx/BigCarouselContainer";

function MainPage() {
  const [searchInputText, setSearchInputText] = useState<string>("");
  const listaLivros = [
    "O Pequeno Príncipe",
    "Memórias Póstumas de Brás Cubar",
    "Dom Quixote",
    "Dom Casmurro",
    "1984",
    "Diário de um Banana",
    "Revolução dos bichos",
    "Memórias de um subsolo",
  ];

  return (
    <>
      <main className="w-full bg-black-blacker h-full flex flex-col justify-center items-center overflow-hidden">
        <section className="max-w-[1680px] w-full py-12 flex h-full items-center">
          <div className="w-1/3 flex flex-col justify-center items-center h-full gap-28">
            <img
              className="w-[300px] h-[300px] block rounded-3xl saturate-0"
              src="/images/Machado_de_Assis_real_negro.jpg"
            />
            <img
              className="w-[300px] h-[300px] block rounded-3xl saturate-0 self-end"
              src="/images/Nietzsche.jpg"
            />
          </div>
          <div className="w-1/3 flex flex-col items-center h-3/3 gap-10">
            <h1 className="text-white text-7xl">BookVault</h1>
            <p className="text-white text-3xl text-center">
              Authors who mark generations, divide opinions, this is the place
              you can share them.
            </p>
            <SearchComponentRoot>
              <SearchComponentInput
                placeholder="Search for a book..."
                value={searchInputText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchInputText(e.currentTarget.value)
                }
                style="placeholder:text-xl text-xl"
              />
              <SearchComponentIcon icon={FaSearch} backgroundColor="white" hoverColor="black" iconColor="black" iconHoverColor="white" onClick={() => {}} />
            </SearchComponentRoot>
          </div>
          <div className="w-1/3 flex flex-col justify-center items-center h-full gap-28">
            <img
              className="w-[300px] h-[300px] block rounded-3xl saturate-0"
              src="/images/Dostoievski.jpg"
            />
            <img
              className="w-[300px] h-[300px] block rounded-3xl saturate-0 self-start "
              src="/images/Shakespeare.jpg"
            />
          </div>
        </section>
      </main>
      <section className="w-full h-fit flex flex-col justify-center items-center bg-bege">
        <Container className="bg-verde-green flex flex-col items-center justify-center py-4">
          <h1 className="text-white text-3xl py-8">Famous Books</h1>
          <BigCarouselContainer
            style="bg-white gap-x-4"
            onClickBackward={() => {}}
            onClickForward={() => {}}
          >
            {listaLivros.map((l) => (
              <CarouselItemRoot style="h-fit text-center">
                <CarouseItemImage
                  imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJCX8NHIJihebhEe_x6P6UBuej5IXl2EoYuQ&s"
                  alt="asdasd"
                />
                <CarouseItemLink to="/" style="text-black" text={l} />
              </CarouselItemRoot>
            ))}
          </BigCarouselContainer>
        </Container>
      </section>
    </>
  );
}

export default MainPage;

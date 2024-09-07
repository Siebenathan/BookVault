import { useState } from "react";
import { Container } from "../components/Layout/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function PerfilPage() {
  const [username, setUsername] = useState<string>("Albert Einstein");
  const [userPhoto, setUserPhoto] = useState<string>(
    "https://s4.static.brasilescola.uol.com.br/be/conteudo/images/2-albert-einstein.jpg"
  );
  const [userBio, setUserBio] =
    useState<string>(`Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Itaque ipsa quidem, ullam eos laudantium qui, recusandae
              atque voluptatem eum quia earum reiciendis delectus hic fugiat
              numquam iste, omnis molestiae distinctio? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ex reprehenderit quam similique
              nemo saepe? Aliquam libero natus ut sapiente eaque ullam
              architecto iste, doloremque ipsum praesentium fugit eum quasi
              officiis.`);
  const [userReadLevel, setUserReadLevel] = useState<string>("frequent reader");

  return (
    <div className="flex justify-center">
      <Container className="bg-verde-green p-5">
        <div className="flex justify-around w-11/12 h-full mt-10">
          <div className="text-center w-1/3 flex items-center justify-center flex-col">
            <img
              src={userPhoto}
              alt="user_photo"
              className="min-w-[200px] min-h-[200px] w-[250px] h-[250px] rounded-full"
            />
            <h1 className="text-white text-h1">{username}</h1>
            <p className="text-white text-h5">{userReadLevel}</p>
          </div>
          <div className="text-justify w-2/3">
            <h2 className="text-white text-h2">Bio</h2>
            <p className="text-white text-p">{userBio}</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center flex-col mt-10 h-full">
          <h1 className="text-h2 text-white">Books readed</h1>
          <div className="w-4/5 mt-5 bg-white p-10 rounded-md">
            <Swiper
              modules={[Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper: any) => console.log(swiper)}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              <SwiperSlide>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrFwH_ULSoL9AaO-N_6z9ACoiwrkOVwFANQ&s"
                  alt="book_image"
                  className="w-[190px] h-[190px]"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrFwH_ULSoL9AaO-N_6z9ACoiwrkOVwFANQ&s"
                  alt="book_image"
                  className="w-[190px] h-[190px]"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrFwH_ULSoL9AaO-N_6z9ACoiwrkOVwFANQ&s"
                  alt="book_image"
                  className="w-[190px] h-[190px]"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrFwH_ULSoL9AaO-N_6z9ACoiwrkOVwFANQ&s"
                  alt="book_image"
                  className="w-[190px] h-[190px]"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </Container>
    </div>
  );
}

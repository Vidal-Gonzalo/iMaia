import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./WritingsCarousel.css";
import { Navigation, Pagination } from "swiper";
import { useNavigate } from "react-router-dom";

/*
Revisar optimización: al actualizar la página desde la sección writings se ralentiza la velocidad de carga
del Home.

*/

export default function WritingsCarousel({ writings }) {
  let navigate = useNavigate();

  return (
    <Swiper
      pagination={true}
      navigation={true}
      spaceBetween={40}
      modules={[Pagination, Navigation]}
      className="writings-carousel"
    >
      {writings?.map((element) => (
        <SwiperSlide
          key={element.id}
          style={{
            backgroundImage: `url(${element.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h3 className="writing-title">{element.title}</h3>
            <p className="writing-fragment">{element.fragment}</p>
            <div className="writing-info">
              <button className="btn">Leer más</button>
              <p
                className="writing-author"
                onClick={() => navigate(`/user/${element.author}`)}
              >
                @{element.author}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

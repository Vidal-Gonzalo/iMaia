import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useSelector } from "react-redux";
import "./Greeting.css";
import "swiper/css";
import "swiper/css/pagination";

export default function Greeting({ texts }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="swiper-container">
      <div className="home-text">
        <h3>¡Bienvenido/a, {user.username}!</h3>
      </div>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="home-carousel"
      >
        {texts?.map((element) => (
          <SwiperSlide
            key={element._id}
            style={{
              backgroundImage: `url(${element.picUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper";
import girlSharing from "../../../../assets/images/girlSharing.png";
import boyWriting from "../../../../assets/images/boyWriting.png";
import diaryGirl from "../../../../assets/images/diaryGirl.png";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "./Features.css";

export default function Features() {
  const images = [
    {
      image: girlSharing,
      justifiedTo: "left",
      text: "Comparte tus escritos",
      width: "40%",
    },
    {
      image: diaryGirl,
      justifiedTo: "right",
      text: "Escribe tu diario",
      width: "70%",
    },
    {
      image: boyWriting,
      justifiedTo: "left",
      text: "Participa en retos de escritura",
      width: "50%",
    },
  ];
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      className="feature-container"
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      effect={"fade"}
      modules={[Autoplay, EffectFade, Pagination]}
      pagination={{ clickable: true }}
      speed={1000}
    >
      {images.map((element, index) => (
        <SwiperSlide
          key={index}
          className="feature"
          style={{
            backgroundImage: `url(${element.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="feature-cta"
            style={{
              justifyContent: element.justifiedTo,
            }}
          >
            <h4 style={{ width: element.width }}>{element.text}</h4>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

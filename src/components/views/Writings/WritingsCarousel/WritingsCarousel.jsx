import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./WritingsCarousel.css";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { useNavigate } from "react-router-dom";
import { executeScroll } from "../../../../utils/scrollTo";

/*
Revisar optimización: al actualizar la página desde la sección writings se ralentiza la velocidad de carga
del Home.
Los escritos NO se van a pasar por props. Habrá que realizar una lógica de fetcheado 
reutilizable para utilizarlo tanto en este componente como en el de WritingsList.

*/

export default function WritingsCarousel({ writings }) {
  let navigate = useNavigate();
  const swiper = useRef(null);

  useEffect(() => {
    executeScroll(swiper);
    swiper.current.swiper.slideTo(0);
  }, [swiper, writings]);

  return (
    <Swiper
      ref={swiper}
      spaceBetween={40}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      effect={"fade"}
      modules={[Autoplay, EffectFade, Pagination, Navigation]}
      pagination={{ clickable: true }}
      navigation={true}
      speed={600}
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
            <p className="writing-fragment">"{element.fragment}"</p>
            <div className="writing-info">
              {" "}
              <p
                style={{
                  margin: 0,
                  marginBottom: "2%",
                }}
                className="writing-author"
                onClick={() => navigate(`/user/${element.author}`)}
              >
                @{element.author}
              </p>
              <button className="btn">Leer más</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "./MostValuedWritings.css";
//import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
//import Button from "../Button/Button";

export default function MostValuedWritings({ title, writings }) {
  //const navigate = useNavigate();
  const [swiper, setSwiper] = useState();
  const prevRef = useRef();
  const nextRef = useRef();

  useEffect(() => {
    if (swiper) {
      if (!swiper.destroyed) {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, [swiper]);

  return (
    <div className="valued-writings-carousel">
      <h5 className="swiper-title">{title}</h5>
      <div className="swiper-container">
        <div className="swiper-button" ref={prevRef}>
          <KeyboardDoubleArrowLeftIcon fontSize={"large"} />
        </div>
        <Swiper
          navigation={{
            prevEl: prevRef?.current,
            nextEl: nextRef?.current,
          }}
          modules={[Navigation]}
          slidesPerView={3}
          loop={"true"}
          className="mySwiper"
          onSwiper={setSwiper}
        >
          <SwiperSlide
            style={{
              backgroundImage:
                "url('https://huellas01.web.app/css/img/topWriting-1.jpg')",
              backgroundSize: "cover",
            }}
          >
            <div className="writing-content">
              <h3 className="writing-title">El mundo</h3>
              <p className="writing-fragment">
                Un hombre del pueblo de Negua, en la costa de Colombia, pudo
                subir al alto cielo. A la vuelta, contó. Dijo que había
              </p>
              <button className="btn btn-large btn-carousel">Leer más</button>
              <span className="writing-author">@wat_ching</span>
            </div>
          </SwiperSlide>

          <SwiperSlide
            style={{
              backgroundImage:
                "url(https://huellas01.web.app/css/img/topWriting-4.jpg)",
              backgroundSize: "cover",
            }}
          >
            <div className="writing-content">
              <h3 className="writing-title">Fuego</h3>
              <p className="writing-fragment">
                Nadie puede salvarte sino tú mismo. te verás una y otra vez en
                situaciones casi imposibles. intentarán una
              </p>
              <button className="btn btn-large btn-carousel">Leer más</button>
              <span className="writing-author">-@justmi</span>
            </div>
          </SwiperSlide>

          <SwiperSlide
            style={{
              backgroundImage:
                "url('https://huellas01.web.app/css/img/writing-3.jpeg')",
              backgroundSize: "cover",
            }}
          >
            <div className="writing-content">
              <h3 className="writing-title">Ocaso</h3>
              <p className="writing-fragment">
                ¿Cómo explican los sentimientos agradables? Afirmando que están
                determinados por la confianza de Dios
              </p>
              <button className="btn btn-large btn-carousel">Leer más</button>
              <span className="writing-author">-@outofcontext</span>
            </div>
          </SwiperSlide>
          <SwiperSlide
            style={{
              backgroundImage:
                "url('https://huellas01.web.app/css/img/writing-2.jpg')",
              backgroundSize: "cover",
            }}
          >
            <div className="writing-content">
              <h3 className="writing-title">Charles</h3>
              <p className="writing-fragment">
                Lorem ipsum dolor sit amet, consectetur
              </p>
              <button className="btn btn-large btn-carousel">Leer más</button>
              <span className="writing-author">-@julystrash</span>
            </div>
          </SwiperSlide>
          <SwiperSlide
            style={{
              backgroundImage:
                "url(https://huellas01.web.app/css/img/poem-1.jpg)",
              backgroundSize: "cover",
            }}
          >
            <div className="writing-content">
              <h3 className="writing-title">Vos</h3>
              <p className="writing-fragment">
                Lorem ipsum dolor sit amet, consectetur
              </p>
              <button className="btn btn-large btn-carousel">Leer más</button>
              <span className="writing-author">-@julystrash</span>
            </div>
          </SwiperSlide>
          <SwiperSlide
            style={{
              backgroundImage:
                "url(https://huellas01.web.app/css/img/writing-6.jpg)",
              backgroundSize: "cover",
            }}
          >
            <div className="writing-content">
              <h3 className="writing-title">Fe</h3>
              <p className="writing-fragment">
                Sin fe, no tenemos esperanza, y sin esperanza no tenemos
                propiamente vida. No teniendo una idea del futuro, tampoco
                tenemos una idea de hoy
              </p>
              <button className="btn btn-large btn-carousel">Leer más</button>
              <span className="writing-author">-@font_sa</span>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="swiper-button" ref={nextRef}>
          <KeyboardDoubleArrowRightIcon fontSize={"large"} />
        </div>
      </div>
    </div>
  );
}

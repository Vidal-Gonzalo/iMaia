import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "./MostValuedWritings.css";
import { useNavigate } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { utilities } from "../../../../utils/utilities";

export default function MostValuedWritings({ title, writings }) {
  const navigate = useNavigate();
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
      <h5 className="swiper-title">{title && title}</h5>
      <div className="swiper-container">
        <div className="swiper-button" ref={prevRef}>
          <ArrowCircleLeftIcon fontSize={"large"} />
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
          {writings?.map((text, index) => (
            <SwiperSlide
              key={index}
              style={{
                backgroundImage: `url(${text.picUrl})`,
                backgroundSize: "cover",
              }}
            >
              <div className="writing-content">
                <h3 className="writing-title">
                  {utilities.limitString(text.title, 25).string}
                </h3>
                <p className="writing-fragment">
                  {utilities.limitString(text.overview, 100).string}
                </p>
                <button
                  className="btn btn-large btn-carousel"
                  onClick={() => navigate(`/text/${text._id}`)}
                >
                  Leer más
                </button>
                <span
                  className="writing-author"
                  onClick={() => navigate(`/user/${text.author}`, true)}
                >
                  @{text.author}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button" ref={nextRef}>
          <ArrowCircleRightIcon fontSize={"large"} />
        </div>
      </div>
    </div>
  );
}

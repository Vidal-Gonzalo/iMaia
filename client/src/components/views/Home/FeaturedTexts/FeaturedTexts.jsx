import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation } from "swiper";
import { utilities } from "../../../../utils/utilities";

export default function FeaturedTexts({ title, texts }) {
  const [swiper, setSwiper] = useState();
  const nextRef = useRef();
  useEffect(() => {
    if (swiper) {
      if (!swiper.destroyed) {
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, [swiper]);

  return (
    <div className="texts-carousel">
      <div className="texts-carousel-title">
        <h4>{title}</h4>
      </div>
      <div className="swiper-container">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          loopedSlides={texts.length}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          onSwiper={setSwiper}
          className="texts-carousel-swiper"
        >
          {texts?.map((element) => (
            <SwiperSlide
              key={element._id}
              style={{
                backgroundImage: `url(${element.picUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div>
                <h3 className="writing-title">{element.title}</h3>
                <p className="writing-fragment">
                  {utilities.limitString(element.overview, 90).string}
                </p>
                <div className="writing-info">
                  {" "}
                  <p
                    style={{
                      margin: 0,
                      marginBottom: "2%",
                    }}
                    className="writing-author"
                  >
                    @{element.author}
                  </p>
                  <button className="btn btn-writing-carousel">
                    <span>Leer más</span>
                  </button>
                </div>
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

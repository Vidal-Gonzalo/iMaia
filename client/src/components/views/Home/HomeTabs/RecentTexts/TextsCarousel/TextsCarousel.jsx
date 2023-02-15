import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import WritingCard from "../../../../../WritingCard/WritingCard";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Navigation } from "swiper";

export default function TextsCarousel({ title, texts }) {
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

  if (texts?.length >= 2) {
    return (
      <div className="texts-carousel">
        <h4 className="texts-carousel-title">{title}</h4>

        <div className="swiper-container">
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            loopedSlides={texts.length}
            modules={[Navigation]}
            onSwiper={setSwiper}
            loop={true}
            className="featured-texts-carousel-swiper"
          >
            {texts.map((element) => (
              <SwiperSlide key={element._id}>
                <div className="slides-container" style={{ width: "80vw" }}>
                  <WritingCard
                    element={element}
                    style={{ margin: "1em 0.3rem 1rem 0.3rem" }}
                  />
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
  } else {
    return null;
  }
}

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
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
          slidesPerView={2}
          spaceBetween={50}
          loopedSlides={texts.length}
          loop={true}
          modules={[Navigation]}
          onSwiper={setSwiper}
          className="featured-texts-carousel-swiper"
        >
          {texts?.map((element) => (
            <SwiperSlide key={element._id}>
              <img src={element.picUrl} width="200" alt="Imagen" />
              <div className="slide-content">
                <div className="action">
                  <h3 className="writing-title">
                    {utilities.limitString(element.title, 20).string}
                  </h3>
                  <BookmarkIcon />
                </div>

                <p className="writing-fragment">
                  {utilities.limitString(element.overview, 140).string}
                </p>
                <div className="writing-info">
                  <p
                    style={{
                      margin: 0,
                      marginBottom: "2%",
                    }}
                    className="writing-author"
                  >
                    @{element.author}
                  </p>
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

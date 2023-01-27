import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import WritingCard from "../../../../WritingCard/WritingCard";
import { searchElements } from "../../../../../utils/searchElements";
import { Navigation } from "swiper";

export default function TextsCarousel({ genre, tag, texts }) {
  const [swiper, setSwiper] = useState();
  const [textsByTag, setTextsByTag] = useState([]);
  let section = genre === "Escritos" ? "writings" : "poems";
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

  useEffect(() => {
    const getMostLikedElementsByTag = () => {
      let filteredElements = searchElements.filterElementsByTag(texts, tag);
      setTextsByTag(filteredElements);
    };

    if (texts.length > 0) {
      getMostLikedElementsByTag();
    }
  }, [tag, texts]);

  if (textsByTag.length > 2) {
    return (
      <div className="texts-carousel recent-texts">
        <div className="texts-carousel-title">
          <h4>
            {genre} recientes de <Link to={`/${section}/${tag}`}>{tag}</Link>
          </h4>
        </div>

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
            {textsByTag.map((element) => (
              <SwiperSlide key={element._id}>
                <div className="slides-container" style={{ width: "80vw" }}>
                  <WritingCard element={element} />
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

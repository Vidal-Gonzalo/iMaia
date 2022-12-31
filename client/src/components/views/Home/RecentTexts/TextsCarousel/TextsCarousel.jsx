import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { utilities } from "../../../../../utils/utilities";
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
            slidesPerView={3}
            spaceBetween={10}
            loopedSlides={texts.length}
            modules={[Navigation]}
            onSwiper={setSwiper}
            loop={true}
            className="texts-carousel-swiper"
          >
            {textsByTag.map((element) => (
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
  } else {
    return null;
  }
}

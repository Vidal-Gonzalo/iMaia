import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./WritingsCarousel.css";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { useNavigate, useParams } from "react-router-dom";
import { utilities } from "../../../../utils/utilities";
import { Button } from "@mui/material";

export default function WritingsCarousel({ writings }) {
  const { category } = useParams();
  let navigate = useNavigate();
  const swiper = useRef(null);

  useEffect(() => {
    utilities.scrollTo(swiper);
    swiper.current.swiper.slideTo(0);
  }, [swiper, writings, category]);

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
          key={element._id}
          style={{
            backgroundImage: `url(${element.picUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h3 className="writing-title">{element.title}</h3>
            <p className="writing-fragment">"{element.overview}"</p>
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
                &#8212;{element.author}
              </p>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "var(--global-primary-color)",
                  fontFamily: "var(--global-primary-font)",
                  width: "12rem",
                  height: "3rem",
                  margin: "0 1rem 0 1rem",
                }}
                onClick={() => navigate(`/text/${element._id}`)}
                startIcon={<MenuBookIcon />}
              >
                Leer más
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

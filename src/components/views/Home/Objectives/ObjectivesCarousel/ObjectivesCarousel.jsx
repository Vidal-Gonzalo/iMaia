import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./ObjectivesCarousel.css";
import { Pagination } from "swiper";

export default function ObjectivesCarousel({ objectives }) {
  return (
    <div className="objectives-carousel">
      <div className="swiper-container">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {objectives.map((objective, index) => (
            <SwiperSlide
              style={{
                backgroundImage: `url(${objective.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              key={index}
            >
              <div className="carousel-content">
                <h3 className="objective-title">{objective.title}</h3>
                <p className="objective-description">{objective.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

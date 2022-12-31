import React from "react";
import "./Banner.css";
import writerHand from "../../../../assets/images/writerHand.png";
import { utilities } from "../../../../utils/utilities";

export default function Banner({ title, description }) {
  return (
    <div className="banner">
      <div className="banner-content">
        <h4>{title}</h4>
        {utilities.makeTextBold(description, "escribir.")}
      </div>
      <img src={writerHand} className="banner-image" alt={title} />
    </div>
  );
}

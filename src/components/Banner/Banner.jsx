import React from "react";

import "./Banner.css";
import writerHand from "../../assets/images/writerHand.png";

export default function Banner({ title, description }) {
  const makeTextBold = (text, word) => {
    return text;
  };

  return (
    <div className="banner">
      <div className="banner-content">
        <h4>{title}</h4>
        <p>{makeTextBold(description, "escribir.")}</p>
      </div>
      <img src={writerHand} className="banner-image" alt={title} />
    </div>
  );
}

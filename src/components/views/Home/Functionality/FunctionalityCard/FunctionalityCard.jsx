import React from "react";
import "./FunctionalityCard.css";
export default function FunctionalityCard({ image, title, description }) {
  return (
    <div className="functionality-card">
      <img src={image} alt={title} className="functionality-card-image" />
      <h4 className="functionality-card-title">{title}</h4>
      <p className="functionality-card-description">{description}</p>
    </div>
  );
}

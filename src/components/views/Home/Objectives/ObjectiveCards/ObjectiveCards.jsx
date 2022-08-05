import React from "react";
import "./ObjectiveCards.css";

export default function ObjectiveCards({ card }) {
  return (
    <div className="card">
      <div className="card-icon">{card.icon}</div>
      <div className="card-text">
        <p className="card-title"> {card.title}</p>
        <p className="card-description">{card.description}</p>
      </div>
    </div>
  );
}

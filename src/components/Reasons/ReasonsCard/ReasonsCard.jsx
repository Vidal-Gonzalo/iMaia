import React from "react";
import "./ReasonsCard.css";
import lampOn from "../../../assets/images/lampOn.png";
import lampOff from "../../../assets/images/lampOff.png";

export default function ReasonsCard({
  id,
  title,
  description,
  isActive,
  changeLampState,
}) {
  return (
    <div className="reasons-card">
      <div className="reasons-content">
        <div className="reasons-lamp">
          {isActive.includes(id) ? (
            <img
              src={lampOn}
              className="reasons-lamp-image"
              alt="Lamp on"
              onClick={() => changeLampState(id)}
            />
          ) : (
            <img
              src={lampOff}
              className="reasons-lamp-image"
              alt="Lamp off"
              onClick={() => changeLampState(id)}
            />
          )}
        </div>
        <div className="reasons-text">
          <h4 className="reasons-content-title">{title}</h4>
          <p className="reasons-content-description">{description}</p>
        </div>
      </div>
    </div>
  );
}

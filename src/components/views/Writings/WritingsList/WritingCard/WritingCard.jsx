import Button from "../../../../Button/Button";
import React from "react";
import "./WritingCard.css";
import { useNavigate } from "react-router-dom";

export default function WritingCard({ writing }) {
  const navigate = useNavigate();
  const limitString = (str) => {
    if (str.length > 120) return { string: str.slice(0, 120).concat("...") };
    return str;
  };

  /*Mismo diseño que wattpad (https://www.wattpad.com/stories/detodo)
  Mi excusa es que es la mejor manera de darle importancia a cada escrito
  al ponerlos horizontales el usuario puede extenderse un poco más en su overview.
  */

  return (
    <div className="writing-card">
      <div className="img-container">
        <img src={writing.picUrl} alt="blabla" width="200" height="200" />
      </div>
      <div className="text-container">
        <h3>{writing.title}</h3>{" "}
        <div className="writing-info">
          <p>{writing.date}</p>
        </div>
        <div className="writing-overview">
          {limitString(writing.overview).string}
        </div>
        <Button
          text={"Leer más"}
          action={() => navigate(`/text/${writing.id}`)}
        />
      </div>
    </div>
  );
}

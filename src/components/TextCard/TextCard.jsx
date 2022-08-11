import Button from "../Button/Button";
import React from "react";
import "./TextCard.css";
import { Link } from "react-router-dom";

export default function TextCard({ text }) {
  const limitString = (str) => {
    if (str.length > 151) return { string: str.slice(0, 151).concat("...") };
    return str;
  };

  return (
    <div className="text-card">
      <img src={text.picUrl} alt={text.title} className="text-image" />
      <h4 className="text-title">{text.title}</h4>
      <div className="text-info">
        <p>{text.genre === "writing" ? "Escrito" : "Poema"} -</p>
        <p>
          {"\u00a0"}
          {text.date}
        </p>
      </div>
      <div className="text-overview">{limitString(text.overview).string}</div>
      <Link to={`/text/${text.id}`}>
        <Button text={"Leer más"} />
      </Link>
    </div>
  );
}

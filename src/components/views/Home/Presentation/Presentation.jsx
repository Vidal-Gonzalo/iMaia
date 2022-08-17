import React from "react";
import { Link } from "react-router-dom";
import intro from "../../../../assets/images/intro.png";
import Button from "../../../Button/Button";
import "./Presentation.css";

export default function Presentation({ title, subtitle }) {
  return (
    <section
      id="presentation"
      className="presentation-container"
      style={{
        backgroundImage: `url(${intro})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="presentation-text">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <div className="presentation-buttons">
          <Link to="/">
            <Button text={"Quiero leer"} />
          </Link>
          <Link to="/">
            <Button text={"Quiero escribir"} />
          </Link>
        </div>
      </div>
    </section>
  );
}

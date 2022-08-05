import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Banner.css";

export default function Banner({ title }) {
  return (
    <div className="banner">
      <div className="banner-content">
        <div className="banner-title">
          <p>{title}</p>
        </div>
        <div className="banner-buttons">
          <Link to="/">
            <Button text={"Quiero leer"} />
          </Link>
          <Link to="/">
            <Button text={"Quiero escribir"} />
          </Link>
        </div>
      </div>
    </div>
  );
}

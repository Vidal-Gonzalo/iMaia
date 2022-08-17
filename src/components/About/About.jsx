import React from "react";
import about from "../../assets/images/about.png";
import "./About.css";

export default function About() {
  return (
    <div className="about">
      <div className="about-img">
        <img src={about} alt="" width="700" />
      </div>
    </div>
  );
}

import React from "react";
import "./Functionality.css";
import FunctionalityCard from "./FunctionalityCard/FunctionalityCard";
import signup from "../../../../assets/images/signup.png";
import read from "../../../../assets/images/read.png";
import write from "../../../../assets/images/write.png";
import rate from "../../../../assets/images/rate.png";
import line from "../../../../assets/images/line.png";

export default function Functionality({ title }) {
  return (
    <section className="functionality-container">
      <h3 className="functionality-title">{title}</h3>
      <div className="functionality-cards-container">
        <FunctionalityCard
          image={signup}
          title={"Registrate"}
          description={"Lorem ipsum dolor sit amet, consectetur adip"}
        />
        <FunctionalityCard
          image={read}
          title={"Lee"}
          description={"Lorem ipsum dolor sit amet, consectetur adip"}
        />
        <FunctionalityCard
          image={write}
          title={"Escribe"}
          description={"Lorem ipsum dolor sit amet, consectetur adip"}
        />
        <FunctionalityCard
          image={rate}
          title={"Valora"}
          description={"Lorem ipsum dolor sit amet, consectetur adip"}
        />
        {/* <img className="line" src={line} alt="" /> */}
      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import "./Reasons.css";
import ReasonsCard from "./ReasonsCard/ReasonsCard";
import { reasonsGifs } from "./reasonsGifs";

export default function Reasons({ title }) {
  const [isActive, setisActive] = useState([1]);
  const [gif, setGif] = useState(reasonsGifs[0].gif);

  useEffect(() => {
    if (isActive) {
      const newGif = reasonsGifs.filter((g) => g.id === isActive[0]);
      setGif(newGif[0].gif);
    }
  }, [isActive]);

  return (
    <section id="reasons" className="reasons">
      <div className="reasons-container">
        <h3 className="reasons-title">{title}</h3>
        <div className="reasons-content-container">
          <img
            className="reasons-content-gif"
            src={gif}
            alt="Imagen ilustrativa"
          />
          <div className="reasons-cards-container">
            <ReasonsCard
              id={1}
              title={"Conecta con otros autores"}
              description={"Lorem ipsum dolor sit amet"}
              isActive={isActive}
              setisActive={setisActive}
            />
            <ReasonsCard
              id={2}
              title={"Encuentra variedad"}
              description={"Lorem ipsum dolor sit amet, consectetur adipiscing"}
              isActive={isActive}
              setisActive={setisActive}
            />
            <ReasonsCard
              id={3}
              title={"Autores"}
              description={"Lorem ipsum dolor sit amet, consectetur adipiscing"}
              isActive={isActive}
              setisActive={setisActive}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

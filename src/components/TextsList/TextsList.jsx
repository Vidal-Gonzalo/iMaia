import React, { useState } from "react";
import Button from "../Button/Button";
import TextCard from "../TextCard/TextCard";
import { texts } from "./Texts";
import "./TextsList.css";

const textPerRow = 6;

export default function TextsList() {
  const [next, setNext] = useState(textPerRow);
  const handleMoreText = () => {
    setNext(next + textPerRow);
  };

  return (
    <div className="texts-container">
      <h3 className="texts-container-title">Textos subidos recientemente</h3>
      <div className="texts-list">
        {texts?.slice(0, next)?.map((text, index) => (
          <TextCard text={text} key={index} />
        ))}
      </div>
      {next < texts?.length && (
        <Button text={"Cargar más"} action={handleMoreText} />
      )}
    </div>
  );
}

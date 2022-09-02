import React, { useState } from "react";
import Button from "../../../Button/Button.jsx";
import { texts } from "./Texts.js";
import WritingCard from "./WritingCard/WritingCard.jsx";
import "./WritingsList.css";

const textPerRow = 4;

export default function WritingsList() {
  const [next, setNext] = useState(textPerRow);
  const handleMoreText = () => {
    setNext(next + textPerRow);
  };

  return (
    <div className="writings-list-container">
      <div className="writings-list">
        {texts?.slice(0, next)?.map((text, index) => (
          <WritingCard writing={text} key={index} />
        ))}
      </div>
      {next < texts?.length && (
        <Button text={"Cargar más"} action={handleMoreText} />
      )}
    </div>
  );
}

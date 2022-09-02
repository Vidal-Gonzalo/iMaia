import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../Button/Button.jsx";
import { texts } from "../views/Writings/WritingsList/Texts.js";
import WritingCard from "../views/Writings/WritingsList/WritingCard/WritingCard";
import "./TextsByTag.css";

const textPerRow = 4;

export default function TextsByTag() {
  const { tag } = useParams();
  const [textsByTag, setTextsByTag] = useState();

  useEffect(() => {
    const textsFiltered = texts.filter((text) => text.category === tag);
    setTextsByTag(textsFiltered);
  }, [tag]);

  const [next, setNext] = useState(textPerRow);
  const handleMoreText = () => {
    setNext(next + textPerRow);
  };

  return (
    <div className="texts-by-tag">
      <div className="texts-by-tag-list">
        {textsByTag?.slice(0, next)?.map((text, index) => (
          <WritingCard writing={text} key={index} />
        ))}
      </div>
      {next < textsByTag?.length && (
        <Button text={"Cargar más"} action={handleMoreText} />
      )}
    </div>
  );
}

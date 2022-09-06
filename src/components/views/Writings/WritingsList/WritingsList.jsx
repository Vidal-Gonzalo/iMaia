import React, { useState, useEffect } from "react";
import Button from "../../../Button/Button.jsx";
import { texts } from "./Texts.js";
import { useParams } from "react-router-dom";
import "./WritingsList.css";
import WritingCard from "./WritingCard/WritingCard";

const textPerRow = 8;

export default function WritingsList() {
  const { tag } = useParams();
  const [textsByTag, setTextsByTag] = useState(null);
  const [next, setNext] = useState(textPerRow);
  const handleMoreText = () => {
    setNext(next + textPerRow);
  };

  useEffect(() => {
    if (tag) {
      const textsFiltered = texts.filter((text) => text.category === tag);
      setTextsByTag(textsFiltered);
    }
  }, [tag]);

  if (tag) {
    return (
      <div className="writings-list-container">
        <div className="writings-list">
          {textsByTag?.length ? (
            textsByTag
              .slice(0, next)
              ?.map((text, index) => <WritingCard writing={text} key={index} />)
          ) : (
            <div
              className="no-texts"
              style={{
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ fontFamily: "var(--global-primary-font)" }}>
                Todavia no hay escritos con esta etiqueta :(
              </p>
            </div>
          )}
        </div>
        {next < textsByTag?.length && (
          <Button text={"Cargar más"} action={handleMoreText} />
        )}
      </div>
    );
  } else {
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
}

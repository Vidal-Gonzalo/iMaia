import React, { useState, useEffect } from "react";
import Button from "../../../Button/Button.jsx";
import { texts } from "./Texts.js";
import { useParams } from "react-router-dom";
import "./WritingsList.css";
import WritingCard from "./WritingCard/WritingCard";
import { checkIfIncludes } from "../../../../utils/checkIfIncludes.js";

const textPerRow = 8;

export default function WritingsList() {
  const { category, tag } = useParams();
  const [textsByCategory, setTextsByCategory] = useState([]);
  const [textsByTag, setTextsByTag] = useState([]);
  const [next, setNext] = useState(textPerRow);
  const handleMoreText = () => {
    setNext(next + textPerRow);
  };

  useEffect(() => {
    if (category) {
      const thisCategoryTexts = texts.filter((t) => t.category === category);
      setTextsByCategory(thisCategoryTexts);
    }

    if (tag) {
      let tags = tag.split(",");
      const newList = texts.filter((text) => {
        return checkIfIncludes(text.tags, tags);
      });
      setTextsByTag(newList);
    }
  }, [tag, category]);

  if (tag) {
    return (
      <div className="writings-list-container">
        <div className="writings-list">
          {textsByTag?.length > 0 ? (
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
          {textsByCategory?.slice(0, next)?.map((text, index) => (
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

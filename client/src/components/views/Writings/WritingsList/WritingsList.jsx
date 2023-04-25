import React, { useState, useEffect } from "react";
import Button from "../../../Button/Button.jsx";
import { useParams } from "react-router-dom";
import "./WritingsList.css";
import WritingCard from "../../../WritingCard/WritingCard";
import { utilities } from "../../../../utils/utilities.js";
import { motion, AnimatePresence } from "framer-motion";

const textPerRow = 8;

export default function WritingsList({ texts }) {
  const { genre, tag } = useParams();
  const [textsByTag, setTextsByTag] = useState([]);
  const [next, setNext] = useState(textPerRow);
  const handleMoreText = () => {
    setNext(next + textPerRow);
  };

  useEffect(() => {
    if (genre !== undefined && tag !== undefined) {
      //Añadido de tags
      let tags = tag.split(",");
      const newList = texts?.filter((text) => {
        return utilities.checkIfIncludes(text.tags, tags);
      });
      if (newList.length > 0) {
        setTextsByTag(newList);
      } else {
        setTextsByTag([]);
      }
    }
  }, [texts, genre, tag]);

  if (tag !== undefined) {
    return (
      <div className="writings-list-container">
        <motion.div layout className="writings-list">
          <AnimatePresence>
            {textsByTag?.length > 0 ? (
              textsByTag
                .slice(0, next)
                ?.map((text, index) => (
                  <WritingCard element={text} key={index} type={"writings"} />
                ))
            ) : (
              <div
                className="no-texts"
                style={{
                  height: "100%",
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
          </AnimatePresence>
        </motion.div>
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
            <WritingCard element={text} key={index} type={"writings"} />
          ))}
        </div>
        {next < texts?.length && (
          <Button text={"Cargar más"} action={handleMoreText} />
        )}
      </div>
    );
  }
}

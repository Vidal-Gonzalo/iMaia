import React, { useEffect, useState } from "react";
import { textServices } from "../../../../../api/textServices";
import { searchElements } from "../../../../../utils/searchElements";
import TextsCarousel from "./TextsCarousel/TextsCarousel";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UnderlinedLink from "../../../../UnderlinedLink/UnderlinedLink";

export default function RecentTexts({ genre, tags }) {
  const [texts, setTexts] = useState([]);
  let section = genre === "Escritos" ? "writings" : "poems";

  useEffect(() => {
    const loadTexts = async () => {
      const response = await textServices.getTexts();
      if (response) {
        setTexts(response);
      }
    };
    loadTexts();
  }, []);

  return (
    <>
      {texts.length > 0 &&
        tags?.map((tag, index) => {
          const title = (
            <p>
              {genre} recientes de{" "}
              <UnderlinedLink params1={section} params2={tag} text={tag} />
            </p>
          );
          return (
            <TextsCarousel
              key={index}
              title={title}
              texts={searchElements.filterElementsByTag(section, texts, tag)}
            />
          );
        })}
    </>
  );
}

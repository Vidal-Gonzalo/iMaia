import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PoemsToCarousel } from "./PoemsToCarousel";
import "./Writings.css";
import WritingsCarousel from "./WritingsCarousel/WritingsCarousel.jsx";
import SearchWritings from "./WritingsList/SearchWritings/SearchWritings";
import WritingsList from "./WritingsList/WritingsList";
import { WritingsToCarousel } from "./WritingsToCarousel";

export default function Writings() {
  const { genre } = useParams();
  const [writings, setWritings] = useState();
  const [poems, setPoems] = useState();

  useEffect(() => {
    setWritings(WritingsToCarousel);
    setPoems(PoemsToCarousel);
  }, [genre, writings, poems]);

  return (
    <section id="writings-section">
      {genre === "writings" ? (
        <>
          <WritingsCarousel writings={writings} />
          <SearchWritings section={"writings"} />
          <WritingsList />
        </>
      ) : genre === "poems" ? (
        <>
          <WritingsCarousel writings={poems} />
          <SearchWritings section={"poems"} />
          <WritingsList />
        </>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          ¡Ups! Página no encontrada...
        </div>
      )}
    </section>
  );
}

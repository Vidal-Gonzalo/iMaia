import React, { useEffect, useState } from "react";
import { PoemsToCarousel } from "./PoemsToCarousel";
import "./Writings.css";
import WritingsCarousel from "./WritingsCarousel/WritingsCarousel.jsx";
import SearchWritings from "./WritingsList/SearchWritings/SearchWritings";
import WritingsList from "./WritingsList/WritingsList";
import { WritingsToCarousel } from "./WritingsToCarousel";

export default function Writings({ clasification }) {
  const [writings, setWritings] = useState(WritingsToCarousel);
  const [poems, setPoems] = useState(PoemsToCarousel);

  useEffect(() => {}, [clasification, writings, poems]);
  return (
    <section id="writings-section">
      {clasification === "writings" ? (
        <>
          <WritingsCarousel writings={writings} />
          <SearchWritings />
          <WritingsList />
        </>
      ) : (
        <>
          <WritingsCarousel writings={poems} />
          <SearchWritings />
          <WritingsList />
        </>
      )}
    </section>
  );
}

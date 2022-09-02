import React, { useState } from "react";
import "./Writings.css";
import WritingsCarousel from "./WritingsCarousel/WritingsCarousel.jsx";
import SearchWritings from "./WritingsList/SearchWritings/SearchWritings";
import WritingsList from "./WritingsList/WritingsList";
import { WritingsToCarousel } from "./WritingsToCarousel";

export default function Writings() {
  const [writings] = useState(WritingsToCarousel);
  return (
    <section id="writings-section">
      <WritingsCarousel writings={writings} />
      <SearchWritings />
      <WritingsList />
    </section>
  );
}

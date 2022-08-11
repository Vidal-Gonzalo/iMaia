import React, { useState } from "react";
import "./Objectives.css";
import { objectives } from "./Objectives";
import ObjectivesCarousel from "./ObjectivesCarousel/ObjectivesCarousel";

export default function Objectives() {
  return (
    <div className="objectives-container">
      <ObjectivesCarousel objectives={objectives} />
    </div>
  );
}

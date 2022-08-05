import React, { useState } from "react";
import "./Objectives.css";
import { objectives } from "./Objectives";
import ObjectiveCards from "./ObjectiveCards/ObjectiveCards";

export default function Objectives({ title, subtitle }) {
  const [objectiveCards] = useState(objectives);

  return (
    <div className="objectives-container">
      <div className="objectives-text">
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
      </div>
      <div className="objectives-card-container">
        {objectiveCards?.map((card, index) => {
          return <ObjectiveCards card={card} key={index} />;
        })}
      </div>
    </div>
  );
}

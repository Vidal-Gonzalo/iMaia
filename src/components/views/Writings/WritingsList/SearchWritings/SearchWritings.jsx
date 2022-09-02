import React from "react";
import "./SearchWritings.css";
import { tags } from "./Tags.js";
import { useNavigate } from "react-router-dom";

export default function SearchWritings() {
  const navigate = useNavigate();

  return (
    <div className="search-writings">
      <h6>Buscar por etiqueta:</h6>
      <div className="search-tags">
        {tags.map((element) => (
          <button
            className="search-button-tag"
            key={element.id}
            style={{ textTransform: "capitalize" }}
            onClick={() => navigate(`/writings/${element.tag}`)}
          >
            {element.tag}
          </button>
        ))}
      </div>
    </div>
  );
}

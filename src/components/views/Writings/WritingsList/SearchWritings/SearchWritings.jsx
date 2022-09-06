import React from "react";
import "./SearchWritings.css";
import { tags } from "./Tags.js";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function SearchWritings() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState([]);
  const { tag } = useParams();

  const handleClick = (element) => {
    if (isActive.id === element.id) {
      navigate("/writings"); //X
      setIsActive([]); //.filter();
    } else {
      navigate(`/writings/${element.tag}`); //X - window.location etc
      setIsActive(element); //...isActive, element
    }
  };

  useEffect(() => {
    if (tag) {
      const oldTag = tags.filter((element) => element.tag === tag);
      setIsActive(oldTag[0]);
    } else {
      setIsActive([]);
    }
  }, [tag]);

  return (
    <div className="search-writings">
      <div className="search-writings-text">
        <h6>Buscar por etiqueta</h6>
        <p>
          ¿Te gustaría que haya más etiquetas?{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            ¡Clickea aquí!
          </span>
        </p>
      </div>

      <div className="search-tags">
        {tags.map((element) =>
          isActive.id === element.id ? (
            <button
              className="search-button-tag active"
              key={element.id}
              onClick={() => handleClick(element)}
            >
              <span className="button-text">
                {element.tag} <CancelIcon style={{ fontSize: "20px" }} />{" "}
              </span>
            </button>
          ) : (
            <button
              className="search-button-tag"
              key={element.id}
              onClick={() => handleClick(element)}
            >
              <span className="button-text">
                {element.tag} <AddCircleIcon style={{ fontSize: "20px" }} />{" "}
              </span>
            </button>
          )
        )}
      </div>
    </div>
  );
}

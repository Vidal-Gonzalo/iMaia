import React from "react";
import { tags } from "./Tags.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { SearchElements } from "../../../../utils/SearchElements.js";
import "./SearchWritings.css";

export default function SearchWritings({ section }) {
  const navigate = useNavigate();
  const [genreTags, setGenreTags] = useState([]);
  const [isActive, setIsActive] = useState([]);
  const [addedTag, setAddedTag] = useState(false);

  const handleClick = (element) => {
    //Para mostrar los escritos correspondientes
    setAddedTag(true);
    if (isActive.some((item) => item === element)) {
      const newArray = isActive.filter((item) => item !== element);
      setIsActive(newArray);
    } else {
      setIsActive([...isActive, element]);
    }
  };

  const checkIfIsActive = (element, arr) => {
    let includes = false;
    if (arr.includes(element)) includes = true;
    return includes;
  };

  useEffect(() => {
    if (addedTag) {
      if (isActive.length > 0) {
        const string = isActive.join("%2C");
        navigate(`/${section}/${string}`, { replace: true });
      } else {
        navigate(`/${section}`, { replace: true });
        setAddedTag(false);
      }
    }
  }, [isActive, navigate, section, addedTag]);

  useEffect(() => {
    const thisGenreTags = SearchElements.getElementTags(section, tags);
    if (thisGenreTags !== null) {
      setGenreTags(thisGenreTags);
    } else {
      navigate("/"); //Error 404
      setIsActive([]);
    }
  }, [section, genreTags, navigate]);

  return (
    <div className="search-writings">
      <div className="search-writings-text">
        <h6 style={{ textTransform: "capitalize" }}>
          {section === "writings" ? "Escritos" : "Poemas"}
        </h6>
        <p>
          ¿Te gustaría que haya más etiquetas?{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            ¡Clickea aquí!
          </span>
        </p>
      </div>

      <div className="search-tags">
        {genreTags?.map((element, index) =>
          checkIfIsActive(element, isActive) ? (
            <button
              className="search-button-tag active"
              key={index}
              onClick={() => handleClick(element)}
            >
              <span className="button-text">
                {element}
                <CancelIcon style={{ marginLeft: "0.3em", fontSize: "20px" }} />
              </span>
            </button>
          ) : (
            <button
              className="search-button-tag"
              key={index}
              onClick={() => handleClick(element)}
            >
              <span className="button-text">
                {element}{" "}
                <AddCircleIcon
                  style={{ marginLeft: "0.3em", fontSize: "20px" }}
                />
              </span>
            </button>
          )
        )}
      </div>
    </div>
  );
}

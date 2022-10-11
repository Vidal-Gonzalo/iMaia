import React from "react";
import { tags } from "./Tags.js";
import { categories } from "./Categories";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { SearchElements } from "../../../../utils/SearchElements.js";
import "./SearchWritings.css";

export default function SearchWritings({ section }) {
  const navigate = useNavigate();
  const { category } = useParams();
  const [categoryTags, setCategoryTags] = useState([]);
  const [isActive, setIsActive] = useState([]);

  const handleClick = (element) => {
    //Para mostrar los escritos correspondientes
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
    if (isActive.length > 0) {
      const string = isActive.join("%2C");
      navigate(`/${section}/${category}/${string}`);
    } else {
      navigate(`/${section}/${category}`);
    }
  }, [category, isActive, navigate, section]);

  useEffect(() => {
    if (category === undefined) {
      navigate("/");
    } else {
      const categoryId = SearchElements.getElementIdByTitle(
        categories,
        category
      );
      if (categoryId !== null) {
        const thisCategoryTags = SearchElements.getElementTags(
          categoryId,
          tags
        );
        if (categoryTags !== null) {
          setCategoryTags(thisCategoryTags);
        } else {
          navigate("/"); //Error 404
          setIsActive([]);
        }
      } else {
        navigate("/"); //Error 404
        setIsActive([]);
      }
    }
  }, [category, categoryTags, navigate]);

  return (
    <div className="search-writings">
      <div className="search-writings-text">
        <h6>
          {section === "writings" ? "Escritos" : "Poemas"} de {category}
        </h6>
        <p>
          ¿Te gustaría que haya más etiquetas?{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            ¡Clickea aquí!
          </span>
        </p>
      </div>

      <div className="search-tags">
        {categoryTags?.map((element, index) =>
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

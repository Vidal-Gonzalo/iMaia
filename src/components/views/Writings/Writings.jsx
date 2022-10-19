import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./Writings.css";
import WritingsCarousel from "./WritingsCarousel/WritingsCarousel.jsx";
import SearchWritings from "./SearchWritings/SearchWritings";
import WritingsList from "./WritingsList/WritingsList";
import { SearchElements } from "../../../utils/SearchElements";
import { iMaiaApi } from "../../../api/iMaiaApi";

//Hace falta usar un useMemo para no fetchear y hacer toda la lógica de vuelta cada vez que
//el usuario entra al componente.

export default function Writings() {
  const { genre } = useParams();
  const [writings, setWritings] = useState([]);
  const [poems, setPoems] = useState([]);
  const [mostValuedWritings, setMostValuedWritings] = useState([]);
  const [mostValuedPoems, setMostValuedPoems] = useState([]);

  useEffect(() => {
    document.title =
      genre === "writings"
        ? `Escritos - iMaia`
        : genre === "poems"
        ? `Poemas - iMaia`
        : "iMaia";

    const loadTextsData = async (genre) => {
      const response = await iMaiaApi.getTextsByGenre(genre);

      if (genre === "writings") {
        setWritings(response.data.textsByGenre);
      } else {
        setPoems(response.data.textsByGenre);
      }
    };
    loadTextsData(genre);
  }, [genre]);

  useEffect(() => {
    const mostLikedElements = (genre, writings, poems) => {
      if (genre === "writings" && writings.length > 0) {
        setMostValuedWritings(SearchElements.getMostLikedElements(writings));
      }
      if (genre === "poems" && poems.length > 0) {
        setMostValuedPoems(SearchElements.getMostLikedElements(poems));
      }
    };
    mostLikedElements(genre, writings, poems);
  }, [genre, writings, poems]);

  return (
    <section id="writings-section">
      {genre === "writings" && writings ? (
        <>
          <WritingsCarousel writings={mostValuedWritings} />
          <SearchWritings section={"writings"} />
          <WritingsList texts={writings} />
        </>
      ) : genre === "poems" && poems ? (
        <>
          <WritingsCarousel writings={mostValuedPoems} />
          <SearchWritings section={"poems"} />
          <WritingsList texts={poems} />
        </>
      ) : (
        /* Error en el género */
        <Navigate replace to="/" />
      )}
    </section>
  );
}

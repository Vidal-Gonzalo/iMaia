import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchInput from "./SearchInput/SearchInput";
import SearchList from "./SearchList/SearchList";
import "./Search.css";
import { iMaiaApi } from "../../../api/iMaiaApi";

export default function Search() {
  const [isFetching, setIsFetching] = useState("idle");
  const [texts, setTexts] = useState([]);
  const [users, setUsers] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const { filter, element } = useParams();

  useEffect(() => {
    const loadElementsData = async (type, name) => {
      setIsFetching("fetching");
      const response = await iMaiaApi.getElementsByName(type, name);
      if (response.data.elements.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
        if (type === "writings" || type === "poems") {
          setTexts(response.data.elements);
        } else if (type === "users") {
          setUsers(response.data.elements);
        }
        setTimeout(() => {
          setIsFetching("fetched");
        }, 3000);
      }
    };
    if (element !== undefined && element.length > 1) {
      loadElementsData(filter, element);
    } else {
      setTexts([]);
      setUsers([]);
    }
  }, [element, filter, noResults]);

  return (
    <section className="search-section">
      <SearchInput filter={filter} />
      {!noResults ? (
        <SearchList
          filter={filter}
          texts={texts}
          users={users}
          isFetching={isFetching}
        />
      ) : (
        <p>{element !== undefined && `No hay resultados para ${element}`}</p>
      )}
    </section>
  );
}

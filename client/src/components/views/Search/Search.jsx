import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SearchInput from "./SearchInput/SearchInput";
import SearchList from "./SearchList/SearchList";
import { iMaiaApi } from "../../../api/iMaiaApi";
import "./Search.css";

export default function Search() {
  const [isFetching, setIsFetching] = useState("idle");
  const [texts, setTexts] = useState([]);
  const [users, setUsers] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const { filter } = useParams();
  const [searchedItem, setSearchedItem] = useSearchParams();
  const element = searchedItem.get("search");

  useEffect(() => {
    //Hacer hook
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
    if (element !== null && element.length > 1) {
      loadElementsData(filter, element);
    } else {
      setTexts([]);
      setUsers([]);
    }
  }, [filter, noResults, searchedItem, element]);

  return (
    <section className="search-section">
      <SearchInput
        filter={filter}
        searchedItem={searchedItem}
        setSearchedItem={setSearchedItem}
      />
      {!noResults ? (
        <SearchList
          filter={filter}
          texts={texts}
          users={users}
          isFetching={isFetching}
        />
      ) : (
        <p>{element !== null && `No hay resultados para ${element}`}</p>
      )}
    </section>
  );
}

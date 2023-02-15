import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SearchInput from "./SearchInput/SearchInput";
import SearchList from "./SearchList/SearchList";
import { debounce } from "lodash";
import { searchServices } from "../../../api/searchServices";
import "./Search.css";

export default function Search() {
  const [isFetching, setIsFetching] = useState("idle");
  const [texts, setTexts] = useState([]);
  const [users, setUsers] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const { filter } = useParams();
  const [searchedItem, setSearchedItem] = useSearchParams();
  const element = searchedItem.get("search");

  // useEffect(() => {
  const delayedSearch = useRef(
    debounce((type, name) => {
      searchServices
        .getElementsByName(type, name)
        .then((response) => {
          if (response.length === 0) {
            setNoResults(true);
          } else {
            setNoResults(false);
            if (type === "writings" || type === "poems") {
              setTexts(response);
            } else if (type === "users") {
              setUsers(response);
            }
          }
        })
        .finally(() => setIsFetching("fetched"));
    }, 1000)
  ).current;

  useEffect(() => {
    if (!searchedItem.has("search")) {
      setTexts([]);
      setUsers([]);
    }
  }, [searchedItem]);

  return (
    <section className="search-section">
      <SearchInput
        filter={filter}
        delayedSearch={delayedSearch}
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

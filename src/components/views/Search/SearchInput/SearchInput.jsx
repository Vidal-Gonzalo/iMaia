import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchInput.css";

export default function SearchInput({ filter }) {
  const [searchedItem, setSearchedItem] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchedItem(e.target.value);
  };

  const checkFilter = (type) => {
    return filter === type;
  };

  const mountedStyle = {
    animation: "inAnimation 250ms ease-in",
  };

  const unmountedStyle = {
    opacity: 0,
    animation: "outAnimation 270ms ease-out",
    animationFillMode: "forwards",
  };

  useEffect(() => {
    document.title = `${
      searchedItem !== "" ? `${searchedItem} - ` : ""
    }Búsqueda de ${
      filter === "writings"
        ? "escritos"
        : filter === "poems"
        ? "poemas"
        : filter === "users" && "usuarios"
    } | iMaia`;
    navigate(`/search/${filter}/${searchedItem}`);
  }, [searchedItem, filter, navigate]);

  return (
    <Box className="search-input-container">
      <form className="search-input">
        <TextField
          className="search-input-body"
          variant="standard"
          label="Buscar..."
          autoComplete="off"
          value={searchedItem}
          onChange={handleChange}
          sx={{
            "& label.Mui-focused": {
              color: "var(--global-primary-color)",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "var(--global-primary-color)",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--global-primary-color)",
              },
              "&:hover fieldset": {
                borderColor: "var(--global-primary-color)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--global-primary-color)",
              },
            },
          }}
          InputProps={{
            style: {
              fontSize: "1.4em",
              fontFamily: "var(--global-primary-font",
            },
          }}
          InputLabelProps={{
            style: {
              fontSize: "1.5em",
              fontFamily: "var(--global-primary-font",
              height: "2em",
            },
          }}
        />
        <Box sx={{ display: "flex" }} className="filters-box">
          <Link className={`search-filters`} to={"/search/writings"}>
            {filter === "writings" ? <b>Escritos</b> : "Escritos"}
            <div
              className="filter-active"
              style={checkFilter("writings") ? mountedStyle : unmountedStyle}
            >
              &nbsp;
            </div>
          </Link>
          <Link className={`search-filters`} to={"/search/poems"}>
            {filter === "poems" ? <b>Poemas</b> : "Poemas"}
            <div
              className="filter-active"
              style={checkFilter("poems") ? mountedStyle : unmountedStyle}
            >
              &nbsp;
            </div>
          </Link>
          <Link className={`search-filters`} to={"/search/users"}>
            {filter === "users" ? <b>Usuarios</b> : "Usuarios"}
            <div
              className="filter-active"
              style={checkFilter("users") ? mountedStyle : unmountedStyle}
            >
              &nbsp;
            </div>
          </Link>
        </Box>
      </form>
    </Box>
  );
}

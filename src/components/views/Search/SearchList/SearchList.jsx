import React from "react";
import WritingCard from "../../Writings/WritingsList/WritingCard/WritingCard";
import UserCard from "../../../UserCard/UserCard";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import "./SearchList.css";

export default function SearchList({ filter, texts, users, isFetching }) {
  return (
    <div className="search-list">
      {isFetching === "fetched"
        ? filter === "writings" || filter === "poems"
          ? texts.map((element, key) => (
              <WritingCard key={key} type={filter} element={element} />
            ))
          : filter === "users" &&
            users.map((element, key) => (
              <UserCard key={key} element={element} type={filter} />
            ))
        : isFetching === "fetching" && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress sx={{ color: "var(--global-primary-color)" }} />
            </Box>
          )}
    </div>
  );
}

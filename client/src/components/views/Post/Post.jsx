import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import PostDetails from "./PostDetails/PostDetails";
import PostImage from "./PostImage/PostImage";
import "./Post.css";
import { Outlet, useLocation } from "react-router-dom";

export default function Post() {
  const location = useLocation();
  useEffect(() => {
    document.title = "Publicar - iMaia";
  }, []);

  return (
    <section className="post">
      {location.pathname === "/write" ? (
        <Grid container className="post-grid-container">
          <Grid xs={4} className="post-grid" item={true}>
            <PostImage />
          </Grid>
          <Grid xs={8} className="post-grid" item={true}>
            <PostDetails />
            <Outlet />
          </Grid>
        </Grid>
      ) : (
        <Outlet />
      )}
    </section>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { iMaiaApi } from "../../../api/iMaiaApi";
import Grid from "@mui/material/Unstable_Grid2";
import "./TextDetail.css";
import Sidebar from "./Sidebar/Sidebar";
import TextContent from "./TextContent/TextContent";
import { executeScroll } from "../../../utils/scrollTo";

export default function TextDetail() {
  const { id } = useParams();
  const [text, setText] = useState();
  const [user, setUser] = useState();
  const textImage = useRef(null);

  useEffect(() => {
    const loadTextData = async (id) => {
      const response = await iMaiaApi.getTextById(id);
      setText(response.data.textById);
    };
    loadTextData(id);
    executeScroll(textImage);
  }, [id]);

  useEffect(() => {
    if (text !== undefined) {
      const loadUserData = async (id) => {
        const response = await iMaiaApi.getUserById(id);
        setUser(response.data.userById);
      };
      loadUserData(text.id_author);
    }
  }, [text]);

  useEffect(() => {
    document.title = `${text?.title} - iMaia`;
  }, [text]);

  return (
    <section id="text-detail">
      <div
        ref={textImage}
        className="text-image-background"
        style={{
          backgroundImage: `url(${text?.picUrl})`,
        }}
      >
        <div
          className="text-complete-image"
          style={{
            backgroundImage: `url(${text?.picUrl})`,
          }}
        ></div>
      </div>
      <Grid container style={{ marginTop: "2em" }}>
        <Grid xs={3}>
          <Sidebar textId={text?.id} user={user} />
        </Grid>
        <Grid xs={9}>
          <TextContent text={text} />
        </Grid>
      </Grid>
    </section>
  );
}

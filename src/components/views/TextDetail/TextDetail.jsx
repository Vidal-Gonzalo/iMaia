import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { iMaiaApi } from "../../../api/iMaiaApi";
import Grid from "@mui/material/Unstable_Grid2";
import "./TextDetail.css";
import Sidebar from "./Sidebar/Sidebar";
import TextContent from "./TextContent/TextContent";
import Comments from "./Comments/Comments";
import TextImage from "./TextImage/TextImage";

export default function TextDetail() {
  const { id } = useParams();
  const [text, setText] = useState();
  const [author, setAuthor] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [userLiked, setUserLiked] = useState(false);

  useEffect(() => {
    const loadTextData = async (id) => {
      const response = await iMaiaApi.getTextById(id);
      setText(response.data.textById);
    };

    try {
      if (id !== "undefined") {
        loadTextData(id);
      }
    } catch (err) {
      console.log(err);
    }
  }, [id, isLiked]);

  useEffect(() => {
    if (text !== undefined) {
      document.title = `${text?.title} - iMaia`;
      const loadAuthorData = async (id) => {
        const response = await iMaiaApi.getUserById(id);
        setAuthor(response.data.userById);
      };
      const checkIfUserLiked = (userId) => {
        if (text.likes.find((e) => e === userId)) {
          setUserLiked(true);
        }
      };

      try {
        loadAuthorData(text.id_author).then(() => {
          checkIfUserLiked(1);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [text]);

  return (
    <section id="text-detail">
      <TextImage text={text} />
      <Grid container style={{ marginTop: "2em" }}>
        <Grid xs={3}>
          <Sidebar textId={text?.id} author={author} />
        </Grid>
        <Grid xs={9}>
          <TextContent
            text={text}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            userLiked={userLiked}
          />
          <Comments textId={text?.id} userId={text?.id_author} />{" "}
          {/*UserId es provisional hasta que usemos Redux y tomemos el ID del usuario loggueado en formcomment.*/}
        </Grid>
      </Grid>
    </section>
  );
}

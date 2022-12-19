import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Sidebar from "./Sidebar/Sidebar";
import TextContent from "./TextContent/TextContent";
import Comments from "./Comments/Comments";
import TextImage from "./TextImage/TextImage";
import { textServices } from "../../../api/textServices";
import { userServices } from "../../../api/userServices";
import { useSelector } from "react-redux";
import "./TextDetail.css";

export default function TextDetail() {
  const { id } = useParams();
  const [text, setText] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [userSaved, setUserSaved] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const changeIsLikedState = () => {
    setIsLiked(!isLiked);
  };

  const changeIsSavedState = () => {
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    let isCancelled = false;
    const loadTextData = async (id) => {
      const response = await textServices.getTextById(id);
      if (response) setText(response);
    };
    const viewText = async (textId) => {
      const response = await textServices.viewText(textId);
      if (response) {
        console.log(response);
      }
    };

    try {
      if (id !== undefined && !isCancelled) {
        loadTextData(id);
        viewText(id);
      }
    } catch (err) {
      console.log(err);
    }
    return () => {
      isCancelled = true;
    };
  }, [id, isLiked]);

  useEffect(() => {
    if (text !== undefined) {
      document.title = `${text?.title} - iMaia`;

      const checkIfUserLiked = (userId) => {
        if (text.likes.find((e) => e === userId)) {
          setUserLiked(true);
        }
      };
      const checkIfUserSavedText = async (textId) => {
        const loggedUser = await userServices.getUserById(user._id);
        if (loggedUser) {
          if (loggedUser.savedTexts.find((e) => e === textId)) {
            setUserSaved(true);
          }
        }
      };

      try {
        checkIfUserLiked(user._id);
        checkIfUserSavedText(text._id);
      } catch (err) {
        console.log(err);
      }
    }
  }, [text, user._id]);

  return (
    <section id="text-detail">
      {text && <TextImage text={text} />}
      <Grid container style={{ marginTop: "2em" }}>
        <Grid xs={3}>{text && <Sidebar authorId={text.id_author} />}</Grid>
        <Grid xs={9}>
          <TextContent
            text={text}
            userLiked={userLiked}
            changeIsLikedState={changeIsLikedState}
            userSaved={userSaved}
            changeIsSavedState={changeIsSavedState}
          />
          <Comments textId={text?._id} />
        </Grid>
      </Grid>
    </section>
  );
}

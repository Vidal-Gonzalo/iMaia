import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard/CommentCard";
import FormComment from "./FormComment/FormComment";
import { iMaiaApi } from "../../../../api/iMaiaApi";
import "./Comments.css";

const commentsAtStart = 6;

export default function Comments({ textId, userId }) {
  const [next, setNext] = useState(commentsAtStart);
  const [textComments, setTextComments] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true); // TODO: Redux
  const [sentComment, setSentComment] = useState(false);

  const handleMoreText = () => {
    setNext(next + commentsAtStart);
  };

  const isCommentSent = () => {
    setSentComment(!sentComment); //Fix
  };

  useEffect(() => {
    const loadComments = async (textId) => {
      const response = await iMaiaApi.getComments(textId);
      setTextComments(response.data.commentsOfThisText);
    };
    try {
      if (textId !== undefined) {
        loadComments(textId);
      }
    } catch (err) {
      console.log(err);
    }
  }, [textId, sentComment]);

  return (
    <div>
      {loggedIn ? (
        <FormComment
          textId={textId}
          userId={userId}
          isCommentSent={isCommentSent}
        />
      ) : null}
      {textComments.length > 0 ? (
        textComments
          .slice(0, next)
          .map((comment, index) => (
            <CommentCard key={index} comment={comment} />
          )) //Hacer commentCard
      ) : (
        <p>No hay comentarios :(</p>
      )}
    </div>
  );
}

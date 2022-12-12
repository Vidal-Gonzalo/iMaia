import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard/CommentCard";
import FormComment from "./FormComment/FormComment";
import "./Comments.css";
import Button from "../../../Button/Button";
import { interactionServices } from "../../../../api/interactionsServices";
import { useSelector } from "react-redux";

const commentsAtStart = 6;

export default function Comments({ textId }) {
  const [next, setNext] = useState(commentsAtStart);
  const [textComments, setTextComments] = useState([]);
  const [sentComment, setSentComment] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleMoreText = () => {
    setNext(next + commentsAtStart);
  };

  const isCommentSent = () => {
    setSentComment(!sentComment); //Fix
  };

  useEffect(() => {
    let isCancelled = false;
    const loadComments = async (textId) => {
      const response = await interactionServices.getComments(textId);
      if (response) {
        setTextComments(response);
      }
    };
    try {
      if (textId !== undefined && !isCancelled) {
        loadComments(textId);
      }
    } catch (err) {
      console.log(err);
    }

    return () => {
      isCancelled = true;
    };
  }, [textId, sentComment]);

  return (
    <div className="comments-container">
      {user ? (
        <FormComment
          textId={textId}
          user={user}
          isCommentSent={isCommentSent}
        />
      ) : null}
      {textComments.length > 0 ? (
        textComments
          .slice(0, next)
          .map((comment, index) => (
            <CommentCard key={index} comment={comment} />
          ))
      ) : (
        <p className="no-comments">¡Haz el primer comentario!</p>
      )}
      {next < textComments?.length && (
        <Button text={"Cargar más"} action={handleMoreText} />
      )}
    </div>
  );
}

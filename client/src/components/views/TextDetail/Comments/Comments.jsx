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
  const [commentsChanged, setCommentsChanged] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleMoreText = () => {
    setNext(next + commentsAtStart);
  };

  const changeComments = () => {
    setCommentsChanged(!commentsChanged); //Fix
  };

  useEffect(() => {
    let isCancelled = false;
    const loadComments = async (textId) => {
      const response = await interactionServices.getComments(textId);
      if (response || response === "") {
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
  }, [textId, commentsChanged]);

  return (
    <div className="comments-container">
      {user ? (
        <FormComment
          textId={textId}
          user={user}
          changeComments={changeComments}
        />
      ) : null}
      {user && textComments.length > 0 ? (
        textComments
          .slice(0, next)
          .map((comment, index) => (
            <CommentCard
              key={index}
              comment={comment}
              changeComments={changeComments}
            />
          ))
      ) : user ? (
        <p className="no-comments">¡Haz el primer comentario!</p>
      ) : (
        <p className="login-to-comment">Inicia sesión para comentar</p> //TODO: footer with invitation to login
      )}
      {next < textComments?.length && (
        <Button text={"Cargar más"} action={handleMoreText} />
      )}
    </div>
  );
}

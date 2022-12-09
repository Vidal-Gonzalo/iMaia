import React, { useEffect, useState } from "react";
import { users } from "../../../../../assets/data/Users";
import { SearchElements } from "../../../../../utils/SearchElements";
import "./CommentCard.css";
import { Link } from "react-router-dom";

export default function CommentCard({ comment }) {
  const [user, setUser] = useState();

  useEffect(() => {
    let isCancelled = false;
    const getUser = (userId) => {
      let userData = setUser(SearchElements.getElementById(users, userId));
      userData !== undefined && setUser(userData);
    };
    try {
      if (!isCancelled) {
        getUser(comment.userId);
      }
    } catch (e) {
      console.error(e);
    }
    return () => {
      isCancelled = true;
    };
  }, [user, comment.userId]);

  return (
    <div className="text-comment">
      <Link to={`/user/${user?.username}`}>
        <div className="comment-user-image">
          <img src={user?.picUrl} width={30} alt={"Profile"} />
        </div>
      </Link>
      <div className="comment-info">
        <Link className="comment-username" to={`/user/${user?.username}`}>
          <p>{user?.username}</p>
        </Link>
        {/* Función de tiempo */}
        <span>Hace 11 horas</span>
        <p className="comment">{comment?.comment}</p>
      </div>
    </div>
  );
}

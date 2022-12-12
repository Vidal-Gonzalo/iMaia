import React, { useEffect, useState } from "react";
import "./CommentCard.css";
import { Link } from "react-router-dom";
import { userServices } from "../../../../../api/userServices";

export default function CommentCard({ comment }) {
  const [user, setUser] = useState();

  useEffect(() => {
    let isCancelled = false;
    const getUser = async (userId) => {
      let user = await userServices.getUserById(userId);
      if (user) {
        setUser(user);
      }
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

import React, { useEffect, useState } from "react";
import avatar from "../../../../../assets/images/avatar.jpg";
import { users } from "../../../../../assets/data/Users";
import { SearchElements } from "../../../../../utils/SearchElements";
import "./CommentCard.css";

export default function CommentCard({ comment }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = (userId) => {
      let userData = setUser(SearchElements.getElementById(users, userId));
      userData !== undefined && setUser(userData);
    };
    if (user !== null) {
      getUser(comment.userId);
    }
  }, [user]);

  return (
    <div className="text-comment">
      <div className="comment-user-image">
        <img src={avatar} width={30} alt={avatar} />
      </div>
      <div className="comment-info">
        <p className="comment-username">{user?.username}</p>
        {/* Función de tiempo */}
        <span>Hace 11 horas</span>
        <p className="comment">{comment?.comment}</p>
      </div>
    </div>
  );
}

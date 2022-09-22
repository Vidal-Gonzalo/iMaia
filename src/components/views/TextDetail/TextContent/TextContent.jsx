import React, { useState, useRef, useEffect } from "react";
import avatar from "../../../../assets/images/avatar.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./TextContent.css";
import { iMaiaApi } from "../../../../api/iMaiaApi";

export default function TextContent({ text }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const textContent = useRef(null);

  const handleClickOnLike = () => {
    setLiked(!liked);
    iMaiaApi.likeAPost(6, 6);
  };

  const handleClickOnSave = () => {
    setSaved(!saved);
  };

  const convertToParagraphs = (str, ref) => {
    str = str.replace(/(?:\r\n|\r|\n)/g, "<br/>");
    ref.current.innerHTML = str;
  };

  return (
    <div className="text">
      <div className="text-title">
        <h5>{text?.title}</h5>
      </div>
      <div className="text-content">
        <p ref={textContent}>
          {text && convertToParagraphs(text.text, textContent)}
        </p>
        <hr style={{ marginTop: "1em" }} />
      </div>
      <div className="text-interactions">
        <div className="text-interactions-icons">
          <div className="text-interactions-fav-and-comment">
            {liked ? (
              <FavoriteIcon
                onClick={handleClickOnLike}
                className="interaction-icon fav-icon-active"
              />
            ) : (
              <FavoriteBorderIcon
                onClick={handleClickOnLike}
                className="interaction-icon"
              />
            )}
            <ChatBubbleOutlineIcon className="interaction-icon" />
          </div>
          <div className="text-interactions-save">
            {saved ? (
              <BookmarkIcon
                onClick={handleClickOnSave}
                className="interaction-icon"
              />
            ) : (
              <BookmarkBorderIcon
                onClick={handleClickOnSave}
                className="interaction-icon"
              />
            )}
          </div>
        </div>
      </div>
      <div className="text-interactions-numbers">
        {/* <span>{text?.likes.length} me gusta</span> */}
        <span>5333 me gusta</span>
      </div>
      <div className="text-comment">
        <div className="comment-user-image">
          <img src={avatar} width={30} alt={avatar} />
        </div>
        <div className="comment-info">
          <p className="comment-username">Robertito</p>
          <span>Hace 11 horas</span>
          <p className="comment">
            Tremendo escrito, la parte de lorem ipsum me asesinó.
          </p>
        </div>
      </div>
    </div>
  );
}

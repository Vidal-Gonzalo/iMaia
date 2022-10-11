import React, { useState, useRef, useEffect } from "react";
import { iMaiaApi } from "../../../../api/iMaiaApi";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./TextContent.css";

export default function TextContent({ text, isLiked, setIsLiked, userLiked }) {
  const [heartClicked, setHeartClicked] = useState(false);
  const [saved, setSaved] = useState(false);
  const textContent = useRef(null);

  useEffect(() => {
    if (userLiked) {
      setHeartClicked(true);
    }
  }, [userLiked]);

  const handleClickOnLike = () => {
    iMaiaApi.likeAPost(text.id, 1); //1 = userId
    setIsLiked(!isLiked);
    setHeartClicked(!heartClicked);
  };

  const handleClickOnSave = () => {
    setSaved(!saved);
    iMaiaApi.saveAPost(text.id, text.id_author);
  };

  const convertToParagraphs = (str, ref) => {
    if (str !== "" && ref !== null) {
      str = str.replace(/(?:\r\n|\r|\n)/g, "<br/>");
      ref.current.innerHTML = str;
    }
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
      </div>
      <div className="text-interactions">
        <div className="text-interactions-icons">
          <div className="text-interactions-fav-and-comment">
            {heartClicked ? (
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
        <span>{text?.likes.length} me gusta</span>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./TextContent.css";
import { interactionServices } from "../../../../api/interactionsServices";

export default function TextContent({
  text,
  changeIsLikedState,
  userLiked,
  changeIsSavedState,
  userSaved,
}) {
  const [heartClicked, setHeartClicked] = useState(false);
  const [bookMarkClicked, setBookMarkClicked] = useState(false);
  const textContent = useRef(null);

  useEffect(() => {
    if (userLiked) {
      setHeartClicked(true);
    }
    if (userSaved) {
      setBookMarkClicked(true);
    }
  }, [userLiked, userSaved]);

  const handleClickOnLike = async () => {
    const response = await interactionServices.interactionWithPost(
      text._id,
      "like"
    );
    if (response) {
      changeIsLikedState();
      setHeartClicked(!heartClicked);
    }
  };

  const handleClickOnSave = async () => {
    const response = await interactionServices.interactionWithPost(
      text._id,
      "save"
    );
    if (response) {
      changeIsSavedState();
      setBookMarkClicked(!bookMarkClicked);
    }
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
            {bookMarkClicked ? (
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
          <div className="text-interactions-save"></div>
        </div>
      </div>
      <div className="text-interactions-numbers">
        <span>{text?.likes.length} me gusta</span>
      </div>
    </div>
  );
}

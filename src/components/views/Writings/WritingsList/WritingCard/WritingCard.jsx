import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import "./WritingCard.css";

export default function WritingCard({ writing }) {
  const tagsPerRow = 4;
  const limitString = (str) => {
    if (str.length > 120) return { string: str.slice(0, 220).concat("...") };
    return str;
  };
  const calculateMoreTags = (writing) => {
    const tags = writing.tags.length;
    if (tags > tagsPerRow) return `+${tags - tagsPerRow} más`;
    else return null;
  };

  return (
    <div className="text-card">
      <div className="text-image">
        <Link to={`/text/${writing.id}`}>
          <img src={writing.picUrl} alt={writing.title} />
        </Link>
      </div>

      <div className="text-content">
        <Link to={`/text/${writing.id}`}>
          <h5 className="text-title">{writing.title}</h5>{" "}
        </Link>

        <p className="text-author">
          Escrito por{" "}
          <Link to={`/user/${writing.author}`}>{writing.author}</Link>
        </p>

        <div className="text-interactions">
          <Tooltip title={"Me gusta"}>
            <FavoriteIcon className="text-icons" />
          </Tooltip>
          <span className="text-interactions-numbers">{writing.likes}</span>
          <Tooltip title={"Vistas"}>
            <VisibilityIcon className="text-icons" />
          </Tooltip>
          <span className="text-interactions-numbers">{writing.views}</span>
        </div>

        <p className="text-fragment">{limitString(writing.overview).string}</p>

        <div className="text-tags">
          {writing?.tags?.length
            ? writing.tags.slice(0, tagsPerRow)?.map((tag, index) => (
                <button className="text-tag" key={index}>
                  {tag.title}
                </button>
              ))
            : null}
          <span>{calculateMoreTags(writing)}</span>
        </div>
      </div>
    </div>
  );
}

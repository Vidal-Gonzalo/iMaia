import React from "react";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { utilities } from "../../utils/utilities";
import "./WritingCard.css";

export default function WritingCard({ element, style }) {
  const tagsPerRow = 4;
  const titleMaxChars = 20;
  const overviewMaxChars = 180;

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-card"
      style={style}
    >
      <div className="text-image">
        <Link to={`/text/${element._id}`}>
          <img src={element.picUrl} alt={element.title} />
        </Link>
      </div>

      <div className="text-content">
        <Link className="text-title" to={`/text/${element._id}`}>
          {utilities.limitString(element.title, titleMaxChars).string}
        </Link>

        <p className="text-author">
          Escrito por{" "}
          <Link to={`/user/${element.author}`}>{element.author}</Link>
        </p>

        <div className="text-interactions">
          <Tooltip title={"Me gusta"}>
            <FavoriteIcon className="text-icons" />
          </Tooltip>
          <span className="text-interactions-numbers">
            {element.likes.length}
          </span>
          <Tooltip title={"Vistas"}>
            <VisibilityIcon className="text-icons" />
          </Tooltip>
          <span className="text-interactions-numbers">{element.views}</span>
        </div>

        <p className="text-fragment">
          {utilities.limitString(element.overview, overviewMaxChars).string}
        </p>

        <div className="text-tags">
          {element?.tags?.length
            ? element.tags.slice(0, tagsPerRow)?.map((tag, index) => (
                <button className="text-tag" key={index}>
                  {tag}
                </button>
              ))
            : null}
          <span>{utilities.calculateMoreTags(element)}</span>
        </div>
      </div>
    </motion.div>
  );
}

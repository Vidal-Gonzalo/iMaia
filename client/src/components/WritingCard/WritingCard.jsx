import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { utilities } from "../../utils/utilities";
import "./WritingCard.css";

export default function WritingCard({ element }) {
  const tagsPerRow = 4;
  const titleMaxChars = 20;
  const overviewMaxChars = 180;

  const calculateMoreTags = (writing) => {
    const tags = writing.tags.length;
    if (tags > tagsPerRow) return `+${tags - tagsPerRow} más`;
    else return null;
  };

  return (
    <div className="text-card">
      <div className="text-image">
        <Link to={`/text/${element._id}`}>
          <img src={element.picUrl} alt={element.title} />
        </Link>
      </div>

      <div className="text-content">
        <Link to={`/text/${element._id}`}>
          <h5 className="text-title">
            {utilities.limitString(element.title, titleMaxChars).string}
          </h5>{" "}
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
          <span>{calculateMoreTags(element)}</span>
        </div>
      </div>
    </div>
  );
}

// <div className="text-card">
//   <div className="text-image">
//     <Link to={`/user/${element.username}`}>
//       <img src={element.picUrl} alt={element.username} />
//     </Link>
//   </div>
//   <div className="text-content">
//     <Link to={`/user/${element.username}`}>
//       <h5 className="text-title">{element.username}</h5>{" "}
//     </Link>
//     <div className="text-interactions">
//       <Tooltip title={"Seguidores"}>
//         <PeopleIcon className="text-icons" />
//       </Tooltip>
//       <span className="text-interactions-numbers">
//         {element.followers.length}
//       </span>
//     </div>

//     <p className="text-fragment">
//       <em>
//         "{utilities.limitString(element.phrase, overviewMaxChars).string}"
//       </em>
//     </p>

//     <div className="text-action">
//       <Button
//         className={follow ? "follow-btn active" : "follow-btn"}
//         variant="outlined"
//         startIcon={follow ? <CheckCircleIcon /> : <PersonAddIcon />}
//         onClick={handleFollow}
//       >
//         {follow ? "Seguido!" : "Seguir"}
//       </Button>
//     </div>
//   </div>
// </div>

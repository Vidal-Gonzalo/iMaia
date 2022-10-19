import React from "react";
import { Link } from "react-router-dom";
import "./SearchCard.css";

export default function SearchCard({ filter, element }) {
  /*
<div className="text-card">
      <div className="text-image">
        <Link to={`/text/${writing.id}`}>
          <img src={writing.picUrl} alt={writing.title} />
        </Link>
      </div>

      <div className="text-content">
        <Link to={`/text/${writing.id}`}>
          <h5 className="text-title">
            {limitString(writing.title, titleMaxChars).string}
          </h5>{" "}
        </Link>

        <p className="text-author">
          Escrito por{" "}
          <Link to={`/user/${writing.author}`}>{writing.author}</Link>
        </p>

        <div className="text-interactions">
          <Tooltip title={"Me gusta"}>
            <FavoriteIcon className="text-icons" />
          </Tooltip>
          <span className="text-interactions-numbers">
            {writing.likes.length}
          </span>
          <Tooltip title={"Vistas"}>
            <VisibilityIcon className="text-icons" />
          </Tooltip>
          <span className="text-interactions-numbers">{writing.views}</span>
        </div>

        <p className="text-fragment">
          {limitString(writing.overview, overviewMaxChars).string}
        </p>

        <div className="text-tags">
          {writing?.tags?.length
            ? writing.tags.slice(0, tagsPerRow)?.map((tag, index) => (
                <button className="text-tag" key={index}>
                  {tag}
                </button>
              ))
            : null}
          <span>{calculateMoreTags(writing)}</span>
        </div>
      </div>
    </div>
  */
  return (
    <div className="search-card">
      {filter === "users" ? (
        <div className="card-content">
          <h5 className="card-title">{element.username}</h5>
          <div className="card-action">
            <button>Seguir</button>
          </div>
        </div>
      ) : (
        <div className="card-content">
          <div className="card-picture">
            <Link to={`/text/${element.id}`}>
              <img src={element.picUrl} alt={element.title} />
            </Link>
          </div>
          <h5 className="card-title">{element.title}</h5>{" "}
          <div className="card-action">
            <button>Ver más</button>
          </div>
        </div>
      )}
    </div>
  );
}

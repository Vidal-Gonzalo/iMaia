import React from "react";
import { Link } from "react-router-dom";
import "./SearchCard.css";

export default function SearchCard({ filter, element }) {
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

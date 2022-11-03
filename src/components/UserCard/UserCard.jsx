import React, { useEffect } from "react";
import PeopleIcon from "@mui/icons-material/People";
import { utilities } from "../../utils/utilities";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import "./UserCard.css";

export default function UserCard({ element }) {
  // const [follow, setFollow] = useState(false);
  // const handleFollow = () => {
  //   setFollow(!follow);
  // };
  useEffect(() => {}, [element]);
  return (
    <div className="user-card">
      <div className="user-image">
        <Link to={`/user/${element.username}`}>
          <img src={element.picUrl} alt={element.username} />
        </Link>
      </div>
      <div className="user-content">
        <Link to={`/user/${element.username}`}>
          <h5 className="user-title">{element.username}</h5>{" "}
        </Link>
        <div className="user-interactions">
          <Tooltip title={"Seguidores"}>
            <PeopleIcon className="user-icons" />
          </Tooltip>
          <span className="user-interactions-numbers">
            {element.followers.length}
          </span>
        </div>

        <p className="user-fragment">{element.biography}</p>

        <p className="user-fragment">
          <em>"{utilities.limitString(element.phrase, 180).string}"</em>
        </p>
      </div>
    </div>
  );
}

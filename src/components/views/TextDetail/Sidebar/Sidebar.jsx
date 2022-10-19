import React, { useState } from "react";
import avatar from "../../../../assets/images/avatar.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ author }) {
  const [followed, setFollowed] = useState(false);

  const handleFollow = () => {
    setFollowed(!followed);
  };

  return (
    <div className="sidebar">
      <div className="author-info">
        <p>Escrito por</p>
        <img src={avatar} alt="" width={50} />
        {author ? (
          <Link className="author" to={`/user/${author.username}`}>
            {author?.username}
          </Link>
        ) : (
          <p>...</p>
        )}
        <Button
          className={followed ? "follow-btn active" : "follow-btn"}
          variant="outlined"
          startIcon={followed ? <CheckCircleIcon /> : <PersonAddIcon />}
          onClick={handleFollow}
        >
          {followed ? "Seguido!" : "Seguir"}
        </Button>
      </div>
      <div className="text-sharing">
        <p>Comparte</p>
        <div className="icon" style={{ backgroundColor: "#DD2A7B" }}>
          <InstagramIcon />
        </div>
        <div className="icon" style={{ backgroundColor: "#00acee" }}>
          <TwitterIcon />
        </div>
        <div className="icon" style={{ backgroundColor: "#3b5998" }}>
          <FacebookIcon />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import avatar from "../../../../assets/images/avatar.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar({ user }) {
  return (
    <div className="sidebar">
      <div className="author-info">
        <p>Escrito por</p>
        <img src={avatar} alt="" width={50} />
        <Link className="author" to={`/user/${user?.username}`}>
          {user?.username}
        </Link>
        <button className="btn btn-large">Seguir +</button>
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

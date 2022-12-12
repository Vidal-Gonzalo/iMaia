import React, { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { interactionServices } from "../../../../api/interactionsServices";

export default function Sidebar({ author }) {
  const [followed, setFollowed] = useState(false);
  const loggedUser = useSelector((state) => state.auth.user);

  const handleFollow = async () => {
    const response = await interactionServices.followUser(author._id);
    if (response) {
      setFollowed(!followed);
    }
  };

  useEffect(() => {
    if (author !== undefined) {
      const checkIfLoggedUserFollowed = (loggedUserId) => {
        let userFollowers = author.followers;
        if (userFollowers.find((e) => e === loggedUserId)) {
          setFollowed(true);
        } else {
          setFollowed(false);
        }
      };
      checkIfLoggedUserFollowed(loggedUser._id);
    }
  }, [author, loggedUser._id]);

  return (
    <div className="sidebar">
      {author ? (
        <>
          <div className="author-info">
            <p>Escrito por</p>
            <img src={author.picUrl} alt="" width={50} />
            <Link className="author" to={`/user/${author.username}`}>
              {author?.username}
            </Link>
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
          </div>{" "}
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress sx={{ color: "var(--global-primary-color)" }} />
        </Box>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { interactionServices } from "../../../../api/interactionsServices";
import { userServices } from "../../../../api/userServices";
import "./Sidebar.css";

export default function Sidebar({ authorId }) {
  const [author, setAuthor] = useState();
  const [followed, setFollowed] = useState(false);
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const loggedUser = useSelector((state) => state.auth.user);

  const handleFollow = async () => {
    const response = await interactionServices.followUser(author._id);
    if (response) {
      setFollowed(!followed);
    }
  };

  useEffect(() => {
    const loadAuthorData = async (id) => {
      const response = await userServices.getUserById(id);
      if (response) {
        setAuthor(response);
      }
    };
    if (authorId !== "undefined") {
      loadAuthorData(authorId);
    }
  }, [authorId]);

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
      if (loggedUser) {
        checkIfLoggedUserFollowed(loggedUser._id);
        if (author._id === loggedUser._id) {
          setIsLoggedUser(true);
        } else {
          setIsLoggedUser(false);
        }
      }
    }
  }, [author, loggedUser]);

  return (
    <div className="sidebar">
      {author ? (
        <>
          <div className="author-info">
            <p>Escrito por</p>
            <Link to={`/user/${author.username}`}>
              {" "}
              <img src={author.picUrl} alt="" width={50} />
            </Link>

            <Link
              className="author"
              style={
                isLoggedUser ? { marginBottom: "0em" } : { marginBottom: "1em" }
              }
              to={`/user/${author.username}`}
            >
              {author?.username}
            </Link>
            {!isLoggedUser ? (
              <Button
                className={followed ? "follow-btn active" : "follow-btn"}
                variant="outlined"
                startIcon={followed ? <CheckCircleIcon /> : <PersonAddIcon />}
                onClick={handleFollow}
              >
                {followed ? "Seguido" : "Seguir"}
              </Button>
            ) : null}
          </div>
          <div
            className="text-sharing"
            style={isLoggedUser ? { marginTop: "2em" } : { marginTop: "3em" }}
          >
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

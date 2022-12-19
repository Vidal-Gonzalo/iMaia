import { Button } from "@mui/material";
import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./ModalUserCard.css";
import { interactionServices } from "../../../../../../../api/interactionsServices";
import { utilities } from "../../../../../../../utils/utilities";

export default function ModalUserCard({ user, changeFollowedState }) {
  const [followButton, setFollowButton] = useState(false);
  const [userFollowedFromModal, setUserFollowedFromModal] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const loggedUser = useSelector((state) => state.auth.user);

  const handleClickOnFollow = async () => {
    const response = await interactionServices.followUser(user._id);
    if (response) {
      changeFollowedState();
      setFollowButton(!followButton);
    }
  };

  useEffect(() => {
    if (utilities.CheckIfIsUserLogged(user._id)) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }
  }, [user._id]);

  useEffect(() => {
    if (user !== undefined) {
      const checkIfLoggedUserFollowed = (loggedUserId) => {
        let userFollowers = user.followers;
        if (userFollowers.find((e) => e === loggedUserId)) {
          setUserFollowedFromModal(true);
        } else {
          setUserFollowedFromModal(false);
        }
      };
      checkIfLoggedUserFollowed(loggedUser._id);
    }
    if (userFollowedFromModal) {
      setFollowButton(true);
    } else {
      setFollowButton(false);
    }
  }, [userFollowedFromModal, user, loggedUser._id]);

  return (
    <div className="modal-user-card">
      {user ? (
        <>
          <div className="user-image">
            <Link to={`/user/${user.username}`}>
              <img src={user.picUrl} alt="" width="50" />
            </Link>
          </div>
          <div className="user-info">
            <Link to={`/user/${user.username}`}>
              <h5>{user.username}</h5>
            </Link>
            <p>{user.biography}</p>
          </div>
          <div className="user-action">
            {!isUserLogged ? (
              <Button
                className={followButton ? "follow-btn active" : "follow-btn"}
                variant="outlined"
                startIcon={
                  followButton ? <CheckCircleIcon /> : <PersonAddIcon />
                }
                onClick={handleClickOnFollow}
              >
                {followButton ? "Seguido" : "Seguir"}
              </Button>
            ) : null}
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

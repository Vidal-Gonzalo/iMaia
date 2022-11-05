import { Button } from "@mui/material";
import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { iMaiaApi } from "../../../../../../../api/iMaiaApi";
import { useEffect } from "react";
import "./ModalUserCard.css";

const USER_ID = 1;

export default function ModalUserCard({
  user,
  followedFromModal,
  setFollowedFromModal,
}) {
  const [followButton, setFollowButton] = useState(false);
  const [userFollowedFromModal, setUserFollowedFromModal] = useState(false);

  const handleClickOnFollow = () => {
    iMaiaApi.followUser(1, user.id); //1 user id
    setFollowedFromModal(!followedFromModal);
    setFollowButton(!followButton);
  };

  useEffect(() => {
    if (user !== undefined) {
      const checkIfUserFollowed = (userId) => {
        let userFollowers = user.followers;
        if (userFollowers.find((e) => e === userId)) {
          setUserFollowedFromModal(true);
        } else {
          setUserFollowedFromModal(false);
        }
      };
      checkIfUserFollowed(USER_ID);
    }
    if (userFollowedFromModal) {
      setFollowButton(true);
    } else {
      setFollowButton(false);
    }
  }, [userFollowedFromModal, user]);

  return (
    <div className="modal-user-card">
      {user ? (
        <>
          <div className="user-image">
            <Link to={`/user/${user.username}`} replace={true}>
              <img src={user.picUrl} alt="" width="50" />
            </Link>
          </div>
          <div className="user-info">
            <Link to={`/user/${user.username}`} replace={true}>
              <h5>{user.username}</h5>
            </Link>
            <p>{user.biography}</p>
          </div>
          <div className="user-action">
            <Button
              className={followButton ? "follow-btn active" : "follow-btn"}
              variant="outlined"
              startIcon={followButton ? <CheckCircleIcon /> : <PersonAddIcon />}
              onClick={handleClickOnFollow}
            >
              {followButton ? "Seguido" : "Seguir"}
            </Button>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

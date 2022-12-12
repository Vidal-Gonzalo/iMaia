import { Button } from "@mui/material";
import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./UserBanner.css";
import { useEffect } from "react";
import { interactionServices } from "../../../../api/interactionsServices";

export default function UserBanner({
  user,
  followed,
  changeFollowedState,
  userFollowed,
}) {
  //Si el usuario está viendo su propio perfil mostrar "Editar perfil" en el lugar de seguir
  const [followButton, setFollowButton] = useState(false);

  const handleClickOnFollow = async () => {
    const response = await interactionServices.followUser(user._id);
    if (response) {
      changeFollowedState(followed);
      setFollowButton(!followButton);
    }
  };

  useEffect(() => {
    if (userFollowed) {
      setFollowButton(true);
    } else {
      setFollowButton(false);
    }
  }, [userFollowed]);

  return (
    <div
      className="user-banner"
      style={{
        // backgroundImage: `url(${user.banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="user-profile-pic">
        <img src={user.picUrl} alt="" />
      </div>
      <div className="user-information">
        <div className="user-title">
          <h3>{user.username}</h3>
          <Button
            className={followButton ? "follow-btn active" : "follow-btn"}
            variant="outlined"
            startIcon={followButton ? <CheckCircleIcon /> : <PersonAddIcon />}
            onClick={handleClickOnFollow}
          >
            {followButton ? "Seguido" : "Seguir"}
          </Button>
        </div>
        <div className="user-description">
          <h5>{user.biography}</h5>
          <div className="user-phrase">
            <p>
              <em>&#x23bc;{user.phrase}</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

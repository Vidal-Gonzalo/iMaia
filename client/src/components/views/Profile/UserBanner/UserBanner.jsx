import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { interactionServices } from "../../../../api/interactionsServices";
import { utilities } from "../../../../utils/utilities";
import banner from "../../../../assets/images/abstractWaveBanner.jpg"; //Temporary
import "./UserBanner.css";

export default function UserBanner({
  user,
  followed,
  changeFollowedState,
  userFollowed,
}) {
  const [isUser, setIsUser] = useState(false);
  const [followButton, setFollowButton] = useState(false);

  const handleClickOnFollow = async () => {
    const response = await interactionServices.followUser(user._id);
    if (response) {
      changeFollowedState(followed);
      setFollowButton(!followButton);
    }
  };

  useEffect(() => {
    if (utilities.checkIfIsUserLogged(user._id)) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [user._id]);

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
        backgroundImage: `url(${banner})`,
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
          {!isUser ? (
            <Button
              className={followButton ? "follow-btn active" : "follow-btn"}
              variant="outlined"
              startIcon={followButton ? <CheckCircleIcon /> : <PersonAddIcon />}
              onClick={handleClickOnFollow}
            >
              {followButton ? "Seguido" : "Seguir"}
            </Button>
          ) : null}
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

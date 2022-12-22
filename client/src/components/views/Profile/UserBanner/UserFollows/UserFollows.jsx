import React, { useState, useEffect } from "react";
import { userServices } from "../../../../../api/userServices";
import ModalFollows from "./ModalFollows/ModalFollows";
import "./UserFollows.css";

export default function UserFollows({
  userId,
  followers,
  following,
  changeFollowedState,
}) {
  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = (type) => {
    if (type === "followings") {
      setType("followings");
    } else {
      setType("followers");
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [userId]);

  useEffect(() => {
    const loadSubscriptionsData = async (userId, type) => {
      if (userId === undefined || type === undefined) {
        return;
      }
      const response = await userServices.getSubscriptionsById(userId, type);
      console.log(response);
      if (response) {
        if (type === "followers") {
          setFollowersData(response);
        } else if (type === "followings") {
          setFollowingsData(response);
        }
      }
    };
    if (open) {
      try {
        loadSubscriptionsData(userId, type);
      } catch (e) {
        console.error(e);
      }
    }
  }, [userId, followers, following, open, type]);

  return (
    <>
      <div className="more-info">
        <div className="followers">
          <p onClick={() => following.length > 0 && handleOpen("followings")}>
            {following.length} Seguidos
          </p>
          <p onClick={() => followers.length > 0 && handleOpen("followers")}>
            {followers.length} Seguidores
          </p>
          <p>Miembro desde Oct 15 2022</p>
        </div>
        <ModalFollows
          handleClose={handleClose}
          open={open}
          type={type}
          followersData={followersData}
          followingsData={followingsData}
          changeFollowedState={changeFollowedState}
        />
      </div>
    </>
  );
}

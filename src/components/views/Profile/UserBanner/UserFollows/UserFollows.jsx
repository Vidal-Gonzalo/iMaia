import React, { useState, useEffect } from "react";
import { iMaiaApi } from "../../../../../api/iMaiaApi";
import ModalFollows from "./ModalFollows/ModalFollows";
import "./UserFollows.css";

export default function UserFollows({ userId, followers, following }) {
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
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
    if (open) {
      const loadSubscriptionsData = async (userId, type) => {
        if (userId === undefined || type === undefined) {
          return;
        }
        const response = await iMaiaApi.getSubscriptionsById(userId, type);
        if (type === "followers") {
          setUserFollowers(response.data.userFollowers);
        } else if (type === "followings") {
          setUserFollowings(response.data.userFollowings);
        }
      };
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
          userFollowers={userFollowers}
          userFollowings={userFollowings}
        />
      </div>
    </>
  );
}

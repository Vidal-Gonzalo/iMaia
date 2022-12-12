import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserBanner from "./UserBanner/UserBanner";
import UserTabs from "./UserTabs/UserTabs";
import UserFollows from "./UserBanner/UserFollows/UserFollows";
import { userServices } from "../../../api/userServices";
import { useSelector } from "react-redux";
import "./Profile.css";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState();
  const [followed, setFollowed] = useState(false);
  const [userFollowed, setUserFollowed] = useState(false);

  const loggedUser = useSelector((state) => state.auth.user);

  const changeFollowedState = () => {
    setFollowed(!followed);
  };

  useEffect(() => {
    const loadUserData = async (username) => {
      const response = await userServices.getUserByUsername(username);
      setUser(response);
    };
    try {
      loadUserData(username);
    } catch (e) {
      console.log(e);
    }
  }, [username, followed]);

  useEffect(() => {
    if (user !== undefined) {
      document.title = `${user.username} - iMaia`;
      const checkIfUserFollowed = (userId) => {
        let userFollowers = user.followers;
        if (userFollowers.find((e) => e === userId)) {
          setUserFollowed(true);
        } else {
          setUserFollowed(false);
        }
      };
      checkIfUserFollowed(loggedUser._id);
    }
  }, [user, userFollowed, loggedUser._id]);
  return (
    <section
      className="profile-section"
      style={{
        height: "100vh",
      }}
    >
      {user && (
        <>
          <UserBanner
            user={user}
            followed={followed}
            changeFollowedState={changeFollowedState}
            userFollowed={userFollowed}
          />
          <UserFollows
            userId={user._id}
            followers={user.followers}
            following={user.following}
            changeFollowedState={changeFollowedState}
          />
          <UserTabs user={user} />
        </>
      )}
    </section>
  );
}

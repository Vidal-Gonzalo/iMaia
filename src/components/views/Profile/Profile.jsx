import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { iMaiaApi } from "../../../api/iMaiaApi";
import UserBanner from "./UserBanner/UserBanner";
import UserTabs from "./UserTabs/UserTabs";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./Profile.css";
import UserFollows from "./UserBanner/UserFollows/UserFollows";

const USER_ID = 1;

export default function Profile() {
  const [user, setUser] = useState();
  const [followed, setFollowed] = useState(false);
  const [userFollowed, setUserFollowed] = useState(false);
  const { username } = useParams();

  const changeFollowedState = (followedState) => {
    setFollowed(!followedState);
  };

  useEffect(() => {
    const loadUserData = async (username) => {
      const response = await iMaiaApi.getUserByUsername(username);
      if (response !== undefined) {
        setUser(response.data.user);
      }
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
      checkIfUserFollowed(USER_ID);
    }
  }, [user, userFollowed]);
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
            userId={user.id}
            followers={user.followers}
            following={user.following}
          />
          <UserTabs user={user} />
        </>
      )}
    </section>
  );
}

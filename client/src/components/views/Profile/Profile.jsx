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
  }, [username, followed, loggedUser]);

  useEffect(() => {
    if (user !== undefined) {
      const checkIfUserFollowed = (userId) => {
        let userFollowers = user.followers;
        if (userFollowers.find((e) => e === userId)) {
          setUserFollowed(true);
        } else {
          setUserFollowed(false);
        }
      };
      if (loggedUser) {
        checkIfUserFollowed(loggedUser._id);
      }
      let capitalizedUsername =
        user.username[0].toUpperCase() + user.username.substring(1);
      document.title = `${capitalizedUsername} - iMaia`;
    }
  }, [user, userFollowed, loggedUser]);
  return (
    <section
      className="profile-section"
      style={{
        height: "100vh",
      }}
    >
      {user ? (
        <>
          <UserBanner
            user={user}
            followed={followed}
            changeFollowedState={changeFollowedState}
            userFollowed={userFollowed}
          />
          <UserFollows
            userId={user._id}
            createdAt={user.createdAt}
            followers={user.followers}
            following={user.following}
            changeFollowedState={changeFollowedState}
          />
          <UserTabs user={user} />
        </>
      ) : (
        loggedUser && (
          <>
            <UserBanner
              user={loggedUser}
              followed={followed}
              changeFollowedState={changeFollowedState}
              userFollowed={userFollowed}
            />
            <UserFollows
              userId={loggedUser._id}
              followers={loggedUser.followers}
              following={loggedUser.following}
              changeFollowedState={changeFollowedState}
            />
            <UserTabs user={loggedUser} />
          </>
        )
      )}
    </section>
  );
}

import React, { useEffect } from "react";
import "./UserFollows.css";

export default function UserFollows({ followers, following, saved }) {
  useEffect(() => {}, [followers, following]);
  return (
    <>
      <div className="more-info">
        <div className="followers">
          <p>{following.length} Seguidos</p>
          <p>{followers.length} Seguidores</p>
          <p>Miembro desde Oct 15 2022</p>
          {/* <button className="options-btn">
                <MoreHorizIcon />
              </button> */}
        </div>
      </div>
      {/* <div className="border"></div> */}
    </>
  );
}

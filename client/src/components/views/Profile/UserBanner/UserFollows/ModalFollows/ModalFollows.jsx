import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ModalUserCard from "./ModalUserCard/ModalUserCard";
import "./ModalFollows.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "1em",
  fontFamily: "var(--global-primary-font)",
  boxShadow: 24,
  p: 4,
};

export default function ModalFollows({
  handleClose,
  open,
  type,
  userFollowers,
  userFollowings,
}) {
  const [followedFromModal, setFollowedFromModal] = useState(false);

  useEffect(() => {}, [followedFromModal, open]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="modal-container" sx={style}>
            <h4 className="modal-follows-title">
              {type === "followers"
                ? `${userFollowers.length} seguidores `
                : `${userFollowings.length} seguidos `}
            </h4>
            <div className="modal-follows-list">
              {type === "followers"
                ? userFollowers.map((follower, index) => (
                    <ModalUserCard
                      key={index}
                      user={follower}
                      followedFromModal={followedFromModal}
                      setFollowedFromModal={setFollowedFromModal}
                    />
                  ))
                : userFollowings.map((following, index) => (
                    <ModalUserCard
                      key={index}
                      user={following}
                      followedFromModal={followedFromModal}
                      setFollowedFromModal={setFollowedFromModal}
                    />
                  ))}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

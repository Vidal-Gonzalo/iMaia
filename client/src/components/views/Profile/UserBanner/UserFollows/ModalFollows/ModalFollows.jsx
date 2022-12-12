import React from "react";
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
  followersData,
  followingsData,
  changeFollowedState,
}) {
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
                ? `${followersData.length} seguidores `
                : `${followingsData.length} seguidos `}
            </h4>
            <div className="modal-follows-list">
              {type === "followers"
                ? followersData.map((follower, index) => (
                    <ModalUserCard
                      key={index}
                      user={follower}
                      changeFollowedState={changeFollowedState}
                    />
                  ))
                : followingsData.map((following, index) => (
                    <ModalUserCard
                      key={index}
                      user={following}
                      changeFollowedState={changeFollowedState}
                    />
                  ))}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

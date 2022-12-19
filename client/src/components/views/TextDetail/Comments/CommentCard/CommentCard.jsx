import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userServices } from "../../../../../api/userServices";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { interactionServices } from "../../../../../api/interactionsServices";
import "./CommentCard.css";

export default function CommentCard({ comment, changeComments }) {
  const [user, setUser] = useState();
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [isLoggedUser, setIsLoggedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteComment = async (id) => {
    setAnchorEl(null);
    const response = await interactionServices.deleteComment(id);
    if (response) {
      changeComments();
      toast.success("Comentario eliminado!", { theme: "colored" });
    }
  };

  const renderActionsMenu = (
    <Menu
      id="actions-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      sx={{
        width: "15%",
        marginRight: "0.9rem",
      }}
    >
      <MenuItem
        sx={{ fontSize: "0.9rem" }}
        onClick={() => deleteComment(comment._id)}
      >
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        Eliminar
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    let isCancelled = false;
    const getUser = async (userId) => {
      let user = await userServices.getUserById(userId);
      if (user) {
        setUser(user);
      }
    };
    const checkIfIsLoggedUser = () => {
      if (comment.userId === loggedUser._id) {
        setIsLoggedUser(true);
      } else {
        setIsLoggedUser(false);
      }
    };
    try {
      if (!isCancelled) {
        getUser(comment.userId);
        checkIfIsLoggedUser();
      }
    } catch (e) {
      console.error(e);
    }
    return () => {
      isCancelled = true;
    };
  }, [comment, loggedUser._id]);

  return (
    <>
      <div className="text-comment">
        <Link to={`/user/${user?.username}`}>
          <div className="comment-user-image">
            <img src={user?.picUrl} width={30} alt={"Profile"} />
          </div>
        </Link>
        <div className="comment-info">
          <div className="comment-info-data">
            {" "}
            <Link className="comment-username" to={`/user/${user?.username}`}>
              <p>{user?.username}</p>
            </Link>
            {/* Función de tiempo */}
            <span>Hace 11 horas</span>
            <p className="comment">{comment?.comment}</p>
          </div>
          {isLoggedUser ? (
            <div className="comment-info-interaction">
              <MoreVertIcon onClick={handleClick} sx={{ cursor: "pointer" }} />
            </div>
          ) : null}
        </div>
      </div>
      {renderActionsMenu}
    </>
  );
}

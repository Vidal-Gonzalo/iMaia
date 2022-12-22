import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../../../features/auth/authSlice";
import "./UserSidebar.css";

export default function UserSidebar({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="user-sidebar">
      <div className="user-content">
        <div className="user-picture">
          <img src={user.picUrl} alt={user.username} />
        </div>
        <div className="user-info">
          <h3>{user.username}</h3>
          <h4>{user.email}</h4>
        </div>
        <div className="user-admin">
          <ManageAccountsIcon fontSize="large" />
          <p>Administración de cuenta</p>
        </div>
        <div className="logout">
          <Button
            className="btn-logout"
            endIcon={<LogoutIcon />}
            variant="contained"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    </div>
  );
}

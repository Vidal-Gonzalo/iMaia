import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import "./PostNavbar.css";
import { Typography } from "@mui/material";

export default function PostNavbar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        className="post-navbar"
        sx={{ backgroundColor: "#000", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography
            sx={{
              fontFamily: "var(--global-primary-font)",
              textTransform: "uppercase",
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}
          >
            Mi texto
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

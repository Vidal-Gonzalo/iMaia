import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  zIndex: 10,
  fontSize: "0.9em",
  boxShadow: "none",
  animation: "ease-in",
  transition: "all 500ms",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  margin: "0.5em 2em 0.5em 2em",
  cursor: "pointer",
  fontSize: "1.0em",
  color: "#fff",
  fontFamily: "var(--global-primary-font)",
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
}));

export default function PrimarySearchAppBar() {
  // const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [navbarBackground, setNavbarBackground] = useState(false);
  const [displayBlock, setDisplayBlock] = useState(true);

  console.log(isLoggedIn);

  const changeBackground = (location) => {
    if (
      window.scrollY >= 66 ||
      location.pathname?.includes("search") ||
      location.pathname?.includes("login")
    ) {
      setNavbarBackground(true);
    } else {
      setNavbarBackground(false);
    }
  };

  const changeDisplay = (location) => {
    if (location.pathname?.includes("login")) setDisplayBlock(false);
    else setDisplayBlock(true);
  };

  const handleProfileMenuOpen = (event) => {
    // setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);

  //   handleMobileMenuClose();
  // };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";

  useEffect(() => {
    changeBackground(location);
    window.addEventListener("scroll", changeBackground);
  }, [navbarBackground, location]);

  useEffect(() => {
    changeDisplay(location);
  }, [location]);

  const renderMobileMenu = (
    <Menu
      id="basic-menus"
      anchorEl={mobileMoreAnchorEl}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar
        style={
          navbarBackground
            ? {
                backgroundColor: "#000",
                animation: "ease-in",
                transition: "500ms",
              }
            : { backgroundColor: "transparent" }
        }
        position="static"
      >
        <Toolbar>
          <StyledBox sx={{ display: { xs: "none", md: "flex" } }}>
            <Link style={{ textDecoration: "none" }} to="/">
              <StyledTypography variant="h6" noWrap component="div">
                iMaia
              </StyledTypography>
            </Link>
          </StyledBox>
          {displayBlock && (
            <>
              <Link style={{ textDecoration: "none" }} to="/writings">
                <StyledTypography variant="h6" component="div">
                  Escritos
                </StyledTypography>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/poems">
                <StyledTypography variant="h6" component="div">
                  Poemas
                </StyledTypography>
              </Link>
              {/* <StyledTypography
              variant="h6"
              component="div"
              style={{ marginLeft: "2.6em", marginRight: "2.8em" }}
            >
              Desafíos
            </StyledTypography> */}
              <Box sx={{ flexGrow: 1 }} />
              <StyledBox sx={{ display: { xs: "none", md: "flex" } }}>
                <Link to={`/search/writings`}>
                  <IconButton
                    style={{ marginRight: "0.3em" }}
                    edge="end"
                    color="inherit"
                  >
                    <SearchIcon style={{ fontSize: "1.2em" }} />
                  </IconButton>{" "}
                </Link>

                {isLoggedIn ? (
                  <>
                    <Link style={{ textDecoration: "none" }} to="/write">
                      <StyledTypography variant="h6" noWrap component="div">
                        Escribir
                      </StyledTypography>
                    </Link>
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle fontSize="large" />
                    </IconButton>{" "}
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button
                        style={{
                          backgroundColor: "transparent",
                          fontFamily: "var(--global-primary-font)",
                        }}
                        variant="contained"
                        endIcon={<LoginIcon />}
                      >
                        Iniciar sesión
                      </Button>
                    </Link>
                  </>
                )}
              </StyledBox>
            </>
          )}

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
      {renderMobileMenu}
    </Box>
  );
}

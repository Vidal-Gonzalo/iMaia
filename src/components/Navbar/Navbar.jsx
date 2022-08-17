import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingRight: "0.3em",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  marginTop: "0.350em",
  marginRight: "0.350em",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: "0.480em",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  fontFamily: "var(--global-secondary-font)",
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "black",
  position: "fixed",
  zIndex: 10,
  fontSize: "0.9em",
  borderBottom: "1px solid rgb(182, 179, 179, 0.42)",
  boxShadow: "none",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  padding: "0em 1em 0em 1em",
  cursor: "pointer",
  fontSize: "1.0em",
  color: "#fff",
  fontFamily: "var(--global-primary-font)",
  textTransform: "uppercase",
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchedItem, setSearchedItem] = useState("");
  const [isLoggedIn] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchedItem);
  };

  const handleChange = (event) => {
    setSearchedItem(event.target.value);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
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
      <StyledAppBar position="static">
        <Toolbar>
          <StyledBox sx={{ display: { xs: "none", md: "flex" } }}>
            <Link style={{ textDecoration: "none" }} to="/">
              <StyledTypography variant="h6" noWrap component="div">
                iMaia
              </StyledTypography>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/writings">
              <StyledTypography variant="h6" noWrap component="div">
                Escritos
              </StyledTypography>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/poems">
              <StyledTypography variant="h6" noWrap component="div">
                Poemas
              </StyledTypography>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/categories">
              <StyledTypography variant="h6" noWrap component="div">
                Categorías
              </StyledTypography>
            </Link>
            <form onSubmit={handleSubmit}>
              <Search>
                <StyledInputBase
                  type="text"
                  value={searchedItem}
                  onChange={handleChange}
                  placeholder="Buscar..."
                  inputProps={{ "aria-label": "search" }}
                />
                <SearchIconWrapper>
                  <SearchIcon onClick={handleSubmit} />
                </SearchIconWrapper>
              </Search>
            </form>
          </StyledBox>
          <Box sx={{ flexGrow: 1 }} />

          <StyledBox sx={{ display: { xs: "none", md: "flex" } }}>
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
              </>
            )}
          </StyledBox>
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
      {renderMenu}
    </Box>
  );
}

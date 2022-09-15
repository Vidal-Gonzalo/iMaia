import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { categories } from "../views/Writings/WritingsList/SearchWritings/Categories";
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./Navbar.css";

/*
Dropdown en escritos y poemas -> Elegis una categoría y te aparece (en el lugar donde dice buscar por
  etiqueta) la categoría colocada. Debajo de este título aparecerán las distintas categorías hijas de 
  la categoría principal. Por ejemplo: elijo la categoría Sentimientos, las categorías hijas serían 
  desamor amor felicidad tristeza etc. Elijo la categoría Política, las categorías hijas serían 
  ética, moral, partidos políticos, etc.
*/

/*
Redux para categorías. En el componente search writings tomamos la categoría elegida desde la 
navbar y la guardamos dentro de la variable isActive. Habría que cambiar el nombre y, probablemente, 
crear una nueva variable. Serían mucho más explicativas las variables "category y tag".
Probablemente ni necesite redux por ahora. El hecho de que en el componente se manejen 
dos variables distintas va a contribuir a no necesitar un estado global. La categoría va 
a estar en la url, en base a esa categoría tomamos los tags. 
*/

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingRight: "0.3em",
  borderRadius: "var(--global-border-radius)",
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
  fontFamily: "var(--global-primary-font)",
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#000",
  position: "fixed",
  zIndex: 10,
  fontSize: "0.9em",
  boxShadow: "none",
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
  const renderThisMenu = (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{
        marginTop: "10px",
      }}
    >
      {categories.map((item, index) => (
        <Link
          to={`${
            anchorEl?.innerText === "ESCRITOS" ? `/writings/` : `/poems/`
          }${item.title}`}
          key={index}
        >
          <MenuItem
            onClick={handleMenuClose}
            style={{
              fontFamily: "var(--global-primary-font)",
              fontSize: "0.9em",
              padding: "0.5em 0em 0.5em 0.9em ",
              fontWeight: "bold",
            }}
          >
            {item.title}
          </MenuItem>
        </Link>
      ))}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
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
      <StyledAppBar position="static">
        <Toolbar>
          <StyledBox sx={{ display: { xs: "none", md: "flex" } }}>
            <Link style={{ textDecoration: "none" }} to="/">
              <StyledTypography variant="h6" noWrap component="div">
                iMaia
              </StyledTypography>
            </Link>
            <StyledTypography
              variant="h6"
              component="div"
              onClick={handleProfileMenuOpen}
            >
              <ArrowDropDownIcon />
              Escritos
            </StyledTypography>
            <StyledTypography
              variant="h6"
              component="div"
              onClick={handleProfileMenuOpen}
            >
              <ArrowDropDownIcon />
              Poemas
            </StyledTypography>
            <StyledTypography variant="h6" component="div">
              Desafíos
            </StyledTypography>
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
      {renderThisMenu}
    </Box>
  );
}
